"use client"

import type * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { HelpCircle } from "lucide-react"

interface PopoverTooltipProps {
  content: string | React.ReactNode
  className?: string
}

export function PopoverTooltip({ content, className }: PopoverTooltipProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <HelpCircle className={`h-4 w-4 text-muted-foreground cursor-pointer ${className}`} />
      </PopoverTrigger>
      <PopoverContent className="w-80 text-sm">{content}</PopoverContent>
    </Popover>
  )
}

