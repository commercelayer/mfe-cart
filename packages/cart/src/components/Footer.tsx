import cn from "classnames"
import type { FC } from "react"
import { LogoCL } from "./atoms/LogoCl"

export const Footer: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      data-test-id="cart-footer"
      className={cn(
        "w-full bottom-0 justify-start items-center border-t px-5 text-xs bg-gray-50 text-gray-400 z-30 md:flex md:bottom-0 md:sticky mfd:p-0 md:py-3 md:m-0 md:mt-20 before:hidden md:before:block md:before:absolute md:before:top-0 md:before:left-0 md:before:w-full md:before:z-10 md:before:h-2 md:before:shadow-top md:before:content-['']",
        className,
      )}
    >
      <a target="_blank" href="https://commercelayer.io/" rel="noreferrer">
        <div className="flex items-center">
          Powered by <LogoCL width="135" height="22" className="pl-2" />
        </div>
      </a>
    </div>
  )
}
