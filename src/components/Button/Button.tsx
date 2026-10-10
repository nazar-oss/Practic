import './Button.css'

interface ButtonProps {
  label: string
  onClick: () => void
  variant: 'primary' | 'secondary'
  disabled?: boolean
}

function Button({ label, onClick, variant, disabled = false }: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
