import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { ChevronRight } from '@mattplays/mpds/icons'

const textLinkClass = [
  // Layout
  'inline-flex items-center',
  // Typography — matches Button: Instrument Sans SemiBold, mpds font-size-lg, lh 1.25
  'font-instrument font-semibold text-[length:var(--mpds-font-size-lg)] leading-[1.25]',
  // Color — all states pull from the active theme scope
  'text-[var(--theme-action)]',
  'hover:text-[var(--theme-action-hovered)]',
  'active:text-[var(--theme-action-pressed)]',
  'transition-colors cursor-pointer',
  // Focus
  'focus-visible:outline-none focus-visible:underline',
].join(' ')

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

export default function TextLink({ children, className = '', ...props }: TextLinkProps) {
  return (
    <a className={`${textLinkClass} ${className}`} {...props}>
      {children}
      {/* ChevronRight from @mattplays/mpds — currentColor inherits all three state colors */}
      <ChevronRight className="shrink-0" />
    </a>
  )
}

interface TextLinkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  // Which way the chevron points; mpds only ships ChevronRight, so the others rotate it
  chevron?: 'right' | 'down' | 'up'
}

const CHEVRON_ROTATION = { right: '', down: 'rotate-90', up: '-rotate-90' }

// Same look as TextLink, for in-page actions that aren't navigation
export function TextLinkButton({ children, chevron = 'right', className = '', ...props }: TextLinkButtonProps) {
  return (
    <button type="button" className={`${textLinkClass} ${className}`} {...props}>
      {children}
      <ChevronRight className={`shrink-0 transition-transform ${CHEVRON_ROTATION[chevron]}`} />
    </button>
  )
}
