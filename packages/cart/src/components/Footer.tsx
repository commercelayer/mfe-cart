import cn from "classnames"
import type { FC } from "react"
import { LogoCL } from "./atoms/LogoCl"

export const Footer: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      data-test-id="cart-footer"
      className={cn(
        "w-full bottom-0 justify-start items-center border-t px-5 text-xs bg-gray-50 text-gray-400 z-30 md:flex md:bottom-0 md:sticky mfd:p-0 md:py-3 md:m-0 md:mt-20 before:hidden before:md:block before:md:absolute before:md:top-0 before:md:left-0 before:md:w-full before:md:z-10 before:md:h-2 before:md:shadow-[0px_-4px_1px_0px_rgb(0,0,0,0.025)] before:md:content-['']",
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
