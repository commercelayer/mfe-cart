import { useEffect, useRef } from "react"

export function useCheckFirstMount() {
  const mountingRef = useRef(true)

  useEffect(() => {
    mountingRef.current = false
  }, [])

  return { isFirstMount: mountingRef.current }
}
