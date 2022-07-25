import { LogoCL } from "@commercelayer/react-utils"

export const Footer: React.FC = () => {
  return (
    <div
      data-test-id="cart-footer"
      className="bg-white md:flex md:sticky md:mt-auto w-full bottom-0 justify-start items-center border-t py-8 text-xs text-gray-400 lg:(p-0 mt-4)"
    >
      <a target="_blank" href="https://commercelayer.io/" rel="noreferrer">
        <div className="flex items-center">
          Powered by <LogoCL width="135" height="22" className="pl-2" />
        </div>
      </a>
    </div>
  )
}
