import { LineItemsCount } from "@commercelayer/react-components"
import { FC } from "react"

export const IconShoppingBag: FC = () => {
  return (
    <LineItemsCount>
      {({ quantity }) => (
        <>
          {quantity != null && quantity > 0 && (
            <div className="relative hidden sm:block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="33"
                fill="none"
              >
                <path
                  stroke="#101111"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M27 6.98H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1v-18a1 1 0 0 0-1-1ZM4 10.98h24"
                />
                <path
                  stroke="#101111"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 14.98a5 5 0 0 1-10 0"
                />
              </svg>

              <div className="absolute min-w-[18px] h-[18px] bg-primary flex items-center justify-center text-center text-[10px] font-bold rounded-full text-contrast bottom-[-3px] right-[-3px]">
                {quantity}
              </div>
            </div>
          )}
        </>
      )}
    </LineItemsCount>
  )
}
