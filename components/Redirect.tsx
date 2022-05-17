import { useRouter } from "next/router"
import { FC, useEffect } from "react"

type Props = {
  to: string
}

export const Redirect: FC<Props> = ({ to }) => {
  const router = useRouter()

  useEffect(() => {
    if (to) {
      router.push(to.startsWith("/") ? to : `/${to}`)
    }
  }, [to])

  return null
}
