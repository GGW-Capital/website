"use client"

import { cn } from "@/lib/utils"

interface FilterOption {
  id: string
  label: string
}

interface FilterToggleProps {
  options: FilterOption[]
  activeId: string
  onChange: (id: string) => void
  className?: string
  disabled?: boolean
  showAll?: boolean
}

export default function FilterToggle({
  options,
  activeId,
  onChange,
  className,
  disabled = false,
  showAll,
}: FilterToggleProps) {

  return (
    <div
      className={cn(
        "flex items-center overflow-x-auto scrollbar-hide py-2",
        className,
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      <div className="flex space-x-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-[2px] border-ggw-gold/30 whitespace-nowrap transition-all duration-300 font-sans",
              activeId === option.id
                ? "bg-ggw-gradient text-black font-semibold hover:bg-ggw-gradient-hover"
                : "bg-black text-white/70 hover:text-white border border-ggw-gold/30",
              disabled && "cursor-not-allowed",
            )}
            disabled={disabled}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

