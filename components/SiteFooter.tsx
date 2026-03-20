// Figma node: 265:6260 + 214:1140

import { EditableText } from './cms/EditableText';
import { FooterContent } from '@/types/content';
import defaultContent from '@/content/content.json';

interface SiteFooterProps {
  content?: FooterContent;
}

export default function SiteFooter({ content = defaultContent.footer }: SiteFooterProps) {
  return (
    <footer className="w-full flex flex-col items-center gap-6 py-sp-2xl bg-clay-0">

      {/* "Sarah & Matt" display */}
      <EditableText
        tag="p"
        path="footer.names"
        className="font-romie font-light italic text-cool-green-600 leading-none text-center"
        style={{ fontSize: 'var(--fs-11xl)' }}
      >
        {content.names}
      </EditableText>

      {/* Gold ornamental flourish */}
      <p className="text-yellow-s-300 text-[80px] leading-none select-none" aria-hidden="true">
        ❧
      </p>

      {/* Date */}
      <EditableText
        tag="p"
        path="footer.date"
        className="font-dm font-bold text-fs-sm text-cool-green-600 tracking-[0.12em] uppercase font-dm-overline"
      >
        {content.date}
      </EditableText>
    </footer>
  );
}
