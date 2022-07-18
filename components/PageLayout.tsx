import { FC, ReactNode } from "react"

import { Footer } from "#components/Footer"
import { isEmbedded } from "#utils/isEmbedded"

type Props = {
  children: ReactNode
}

export const PageLayout: FC<Props> = ({ children }) => {
  return isEmbedded() ? (
    <div suppressHydrationWarning={true}>{children}</div>
  ) : (
    <div className="container">
      <div className="px-5 lg:px-20 xl:px-48 flex flex-col min-h-screen">
        {children}
        <Footer />
      </div>
    </div>
  )
}
