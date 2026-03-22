import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={[
        // Layout
        'inline-flex items-center justify-center',
        // Shape
        'rounded-[var(--mpds-radius-md)]',
        // Color — all three states pull from the active theme scope
        'bg-[var(--theme-action)] text-[var(--theme-btn-text)]',
        'hover:bg-[var(--theme-action-hovered)]',
        'active:bg-[var(--theme-action-pressed)]',
        // Typography — Instrument Sans SemiBold, mpds font-size-lg (fluid), lh 1.25
        'font-instrument font-semibold text-[length:var(--mpds-font-size-lg)] leading-[1.25]',
        // Focus ring: 2px white · 3px action · 5px clay-300
        'focus-visible:outline-none',
        'focus-visible:shadow-[0_0_0_2px_white,0_0_0_3px_var(--theme-action),0_0_0_5px_var(--mpds-color-clay-300)]',
        'transition-colors',
        className,
      ].join(' ')}
      // Figma: 14px top / 16px bottom for optical baseline alignment, 32px sides
      style={{ paddingTop: 14, paddingBottom: 16, paddingLeft: 32, paddingRight: 32 }}
      {...props}
    >
      {children}
    </button>
  )
}
