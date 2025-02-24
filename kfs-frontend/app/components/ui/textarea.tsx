import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <div className="form-group">
      <textarea className={cn("underline-textarea", className)} ref={ref} placeholder=" " {...props} />
      <label htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }

