import cn from "classnames"
import { FC } from "react"

type Props = {
  className?: string
  type?: "box" | "circle"
}

export const SkeletonItem: FC<Props> = ({ className, type = "box" }) => {
  return (
    <div
      className={cn(className, {
        "bg-gray-200": true,
        "rounded-full": type === "circle",
        "rounded-xl": type === "box",
      })}
    />
  )
}
