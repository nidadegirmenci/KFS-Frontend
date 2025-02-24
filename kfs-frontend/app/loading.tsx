import { cn } from "@/lib/utils"

interface LoadingProps {
  size?: "small" | "medium" | "large"
}

export default function Loading({ size = "medium" }: LoadingProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className={cn("animate-spin rounded-full border-t-2 border-b-2 border-primary", {
          "h-6 w-6": size === "small",
          "h-12 w-12": size === "medium",
          "h-16 w-16": size === "large",
        })}
      ></div>
    </div>
  )
}

