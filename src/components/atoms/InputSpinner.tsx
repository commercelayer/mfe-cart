import cn from "classnames"
import { useCallback, useEffect, useRef, useState } from "react"

import css from "./InputSpinner.module.css"

import { useDebounce } from "#hooks/debounce"

interface Props {
  /*
   * line_item quantity value returned from current orderId
   */
  quantity: number
  /*
   * callback to use, when the quantity value changes, to trigger an order update
   */
  handleChange: (event: SyntheticSelectChangeEvent) => void
  /*
   * handleChange callback can be debounced by setting a delay in milliseconds
   */
  debounceMs?: number
}

export function InputSpinner({
  quantity,
  handleChange,
  debounceMs = 0,
  ...rest
}: Props): JSX.Element {
  const [internalValue, setInternalValue] = useState<number>(quantity)
  const { debouncedValue } = useDebounce(internalValue, debounceMs)
  const inputEl = useRef<HTMLInputElement | null>(null)

  const handleButtonClick = useCallback((action: "increment" | "decrement") => {
    setInternalValue((state) => {
      const newValue = action === "increment" ? state + 1 : state - 1
      return newValue > 0 ? newValue : state
    })
  }, [])

  useEffect(() => {
    if (debouncedValue !== quantity) {
      const event = makeSyntheticChangeEvent({
        element: inputEl?.current,
        newQuantity: debouncedValue,
      })
      event && handleChange(event)
    }
  }, [debouncedValue])

  return (
    <div
      {...rest}
      className={cn("inline-flex  rounded overflow-hidden", css.inputSpinner)}
    >
      <button
        data-test-id="input-spinner-btn-decrement"
        className="button-base bg-primary text-contrast px-3"
        onClick={() => {
          handleButtonClick("decrement")
        }}
      >
        -
      </button>
      <input
        ref={inputEl}
        data-test-id="input-spinner-element"
        className="input-base -small border-gray-200 w-12 text-center"
        type="number"
        min="0"
        step="1"
        value={internalValue}
        onChange={(event) => {
          const value = parseInt(event.currentTarget.value, 10)
          if (value >= 1) {
            setInternalValue(value)
          }
        }}
      />
      <button
        data-test-id="input-spinner-btn-increment"
        className="button-base bg-primary text-contrast px-3"
        onClick={() => {
          handleButtonClick("increment")
        }}
      >
        +
      </button>
    </div>
  )
}

type SyntheticSelectChangeEvent = React.MouseEvent<
  HTMLSelectElement,
  MouseEvent
>

function makeSyntheticChangeEvent({
  element,
  newQuantity,
}: {
  element?: HTMLInputElement | null
  newQuantity: number
}): SyntheticSelectChangeEvent | null {
  if (!element) {
    return null
  }

  const nativeElement = new Event("change", { bubbles: true })
  const syntheticEvent = {
    ...nativeElement,
    nativeEvent: nativeElement,
    isDefaultPrevented: () => false,
    isPropagationStopped: () => false,
    persist: () => undefined,
    defaultPrevented: false,
    target: { ...element, value: `${newQuantity}` },
    currentTarget: { ...element, value: `${newQuantity}` },
  } as unknown as SyntheticSelectChangeEvent

  return syntheticEvent
}
