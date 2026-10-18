import { motion } from 'framer-motion'
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
    <motion.button
      className={['button', `button--${variant}`, className]
        .filter(Boolean)
        .join(' ')}
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  )
}

export default Button
