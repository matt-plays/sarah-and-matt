import { AnchorHTMLAttributes } from 'react'
import { ChevronRight } from '@mattplays/mpds/icons'

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
}

export default function TextLink({ children, className = '', ...props }: TextLinkProps) {
  return (
    <a
      className={[
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
        className,
      ].join(' ')}
      {...props}
    >
      {children}
      {/* ChevronRight from @mattplays/mpds — currentColor inherits all three state colors */}
      <ChevronRight className="shrink-0" />
    </a>
  )
}
