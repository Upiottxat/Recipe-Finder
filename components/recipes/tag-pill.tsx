"use client"

import type React from "react"
import { cn } from "@/lib/utils"

type TagPillProps = {
  children: React.ReactNode
  className?: string
  variant?: "light" | "dark"
  size?: "sm" | "md"
}

export function TagPill({ children, className, variant = "light", size = "md" }: TagPillProps) {
  const sizeClasses = size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"

  const variantClasses =
    variant === "dark" ? "border-white/15 text-zinc-200 bg-transparent" : "border-zinc-300 text-zinc-700 bg-white"

  return (
    <span className={cn("inline-flex items-center rounded-full border", sizeClasses, variantClasses, className)}>
      {children}
    </span>
  )
}
