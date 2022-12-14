import { useEffect, useRef, useState } from "react"

export function useDebounce(value: number, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  const timeoutId = useRef<NodeJS.Timeout | null>()

  useEffect(() => {
    timeoutId.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [value, delay])

  return { debouncedValue }
}
