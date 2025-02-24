import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="form-group">
      <input type={type} className={cn("underline-input", className)} ref={ref} placeholder=" " {...props} />
      <label htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
})
Input.displayName = "Input"

export { Input }

