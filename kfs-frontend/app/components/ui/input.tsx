import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, id, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {/* Input Alanı */}
      <input
        id={id}
        type={type}
        className={cn(
          "peer w-full border-b-2 border-gray-300 bg-transparent py-2 px-1 text-gray-900 focus:outline-none focus:ring-0 focus:border-blue-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {/* Label */}
      <label
        htmlFor={id}
        className="absolute left-1 top-1/2 text-gray-400 text-sm transform -translate-y-1/2 transition-all
                   peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500
                   peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                   peer-valid:top-0 peer-valid:text-xs peer-valid:text-blue-500"
      >
        {props["aria-label"] || props.placeholder}
      </label>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
