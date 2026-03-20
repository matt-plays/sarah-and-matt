import fs from 'fs';
import path from 'path';
import { SiteContent, HistorySnapshot } from '@/types/content';
import defaultContent from '@/content/content.json';

const CONTENT_FILE = path.join(process.cwd(), 'content', 'content.json');
const HISTORY_FILE = path.join(process.cwd(), 'content', 'history.json');
const MAX_HISTORY = 20;

const isProduction = process.env.NODE_ENV === 'production';

export async function getContent(): Promise<SiteContent> {
  if (process.env.GITHUB_TOKEN && isProduction) {
    try {
      return await readFromGitHub('content/content.json');
    } catch {
      // GitHub unavailable or misconfigured — fall back to bundled content
      return defaultContent as SiteContent;
    }
  }
  if (isProduction) {
    return defaultContent as SiteContent;
  }
  const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
  return JSON.parse(raw);
}

export async function getHistory(): Promise<HistorySnapshot[]> {
  if (process.env.GITHUB_TOKEN && isProduction) {
    try {
      return await readFromGitHub('content/history.json');
    } catch {
      return [];
    }
  }
  if (isProduction) return [];
  try {
    const raw = fs.readFileSync(HISTORY_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveContent(
  content: SiteContent,
  label: string
): Promise<HistorySnapshot[]> {
  const history = await getHistory();

  const snapshot: HistorySnapshot = {
    id: `snap-${Date.now()}`,
    timestamp: new Date().toISOString(),
    label,
    content,
  };

  const updatedHistory = [snapshot, ...history].slice(0, MAX_HISTORY);
  const contentJson = JSON.stringify(content, null, 2);
  const historyJson = JSON.stringify(updatedHistory, null, 2);

  if (isProduction) {
    if (!process.env.GITHUB_TOKEN) {
      throw new Error('GITHUB_TOKEN is not configured — cannot save in production.');
    }
    await writeToGitHub('content/content.json', contentJson, `CMS: ${label}`);
    await writeToGitHub('content/history.json', historyJson, 'CMS: update history');
  } else {
    fs.writeFileSync(CONTENT_FILE, contentJson, 'utf-8');
    fs.writeFileSync(HISTORY_FILE, historyJson, 'utf-8');
  }

  return updatedHistory;
}

// ─── GitHub API helpers ──────────────────────────────────────────────────────

const GH_API = 'https://api.github.com';

function ghHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };
}

function ghConfig() {
  return {
    owner: process.env.GITHUB_OWNER ?? '',
    repo: process.env.GITHUB_REPO ?? '',
    branch: process.env.GITHUB_BRANCH ?? 'main',
  };
}

async function readFromGitHub<T>(filePath: string): Promise<T> {
  const { owner, repo, branch } = ghConfig();
  const res = await fetch(
    `${GH_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
    { headers: ghHeaders(), cache: 'no-store' }
  );
  if (!res.ok) throw new Error(`GitHub read failed: ${res.status}`);
  const data = await res.json();
  const text = Buffer.from(data.content, 'base64').toString('utf-8');
  return JSON.parse(text);
}

async function writeToGitHub(
  filePath: string,
  content: string,
  message: string
): Promise<void> {
  const { owner, repo, branch } = ghConfig();

  // Get current SHA for the file (needed to update)
  let sha: string | undefined;
  const getRes = await fetch(
    `${GH_API}/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`,
    { headers: ghHeaders() }
  );
  if (getRes.ok) {
    const current = await getRes.json();
    sha = current.sha;
  }

  const body: Record<string, string> = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch,
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(
    `${GH_API}/repos/${owner}/${repo}/contents/${filePath}`,
    { method: 'PUT', headers: ghHeaders(), body: JSON.stringify(body) }
  );
  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`GitHub write failed: ${err}`);
  }
}
