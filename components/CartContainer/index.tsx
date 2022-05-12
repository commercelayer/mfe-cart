import { CommerceLayer } from "@commercelayer/react-components"
import { FC, ReactNode } from "react"

interface Props {
  accessToken: string
  endpoint: string
  children: ReactNode
}

export const CartContainer: FC<Props> = ({
  children,
  accessToken,
  endpoint,
}) => {
  return (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}>
      {children}
    </CommerceLayer>
  )
}
