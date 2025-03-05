import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <div className={cn("relative w-full border-b-2 border-gray-400 focus-within:border-blue-500", className)}>
      <textarea
        className="w-full bg-transparent outline-none resize-none p-2 pt-5 text-base text-gray-900"
        ref={ref}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={props.id}
        className="absolute left-2 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
      >
        {props.placeholder}
      </label>
    </div>
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
