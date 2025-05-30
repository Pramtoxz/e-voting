import React from "react"

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
  disabled?: boolean
}

export function Switch({ checked, onChange, className = "", disabled = false }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={`${
        checked ? "bg-blue-600" : "bg-gray-200"
      } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <span
        className={`${
          checked ? "translate-x-6" : "translate-x-1"
        } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
      />
    </button>
  )
} 