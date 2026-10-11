import './Button.css'

interface ButtonProps {
  label: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

function Button({
  label,
  onClick,
  className,
  variant = 'primary',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={['button', `button--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
