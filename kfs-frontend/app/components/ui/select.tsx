import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => {
  return (
    <div className="form-group">
      <select className={cn("underline-select", className)} ref={ref} {...props}>
        <option value="" disabled hidden></option>
        {children}
      </select>
      <label htmlFor={props.id}>{props.placeholder}</label>
    </div>
  )
})
Select.displayName = "Select"

export { Select }

