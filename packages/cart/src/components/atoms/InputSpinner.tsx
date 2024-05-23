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
  /*
   * input is disabled
   */
  disabled?: boolean
}

export function InputSpinner({
  quantity,
  handleChange,
  debounceMs = 0,
  disabled = false,
  ...rest
}: Props): JSX.Element {
  const [internalValue, setInternalValue] = useState<number>(quantity)
  const [internalDisabled, setInternalDisabled] = useState(disabled)
  const { debouncedValue } = useDebounce(internalValue, debounceMs)
  const inputEl = useRef<HTMLInputElement | null>(null)
  const isDisabled = disabled || internalDisabled
  const isInternalValueSynched = quantity === internalValue

  const handleButtonClick = useCallback((action: "increment" | "decrement") => {
    setInternalValue((state) => {
      const newValue = action === "increment" ? state + 1 : state - 1
      return newValue > 0 ? newValue : state
    })
  }, [])

  useEffect(
    function dispatchDebouncedHandleChange() {
      if (isInternalValueSynched) {
        return
      }
      const event = makeSyntheticChangeEvent({
        element: inputEl?.current,
        newQuantity: debouncedValue,
      })
      if (event) {
        handleChange(event)
        // expecting to receive a new `quantity`, in the meantime we need to disable UI
        setInternalDisabled(true)
      }
    },
    [debouncedValue]
  )

  useEffect(
    function syncInternalStateWithOrderQuantity() {
      setInternalDisabled(false)
      if (!isInternalValueSynched) {
        setInternalValue(quantity)
      }
    },
    [quantity]
  )

  useEffect(
    function preventOutOfStockToPermanentlyDisableUi() {
      if (internalDisabled) {
        setTimeout(() => {
          // when out of stock, we won't receive a new `quantity`
          setInternalDisabled(false)
        }, debounceMs + 10)
      }
    },
    [internalDisabled]
  )

  return (
    <div
      {...rest}
      className={cn(
        "inline-flex  rounded overflow-hidden border border-gray-200 focus-within:ring-1",
        css.inputSpinner,
        {
          "opacity-50 pointer-events-none": isDisabled,
        }
      )}
    >
      <button
        data-test-id="input-spinner-btn-decrement"
        className="button-base px-3 py-[10px] hover:enabled:bg-gray-50"
        onClick={() => {
          handleButtonClick("decrement")
        }}
        disabled={isDisabled || internalValue === 1}
      >
        {/* icon minus */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
        >
          <path
            fill="#101111"
            d="M17.5 10a.624.624 0 0 1-.625.625H3.125a.625.625 0 1 1 0-1.25h13.75A.625.625 0 0 1 17.5 10Z"
          />
        </svg>
      </button>
      <input
        ref={inputEl}
        data-test-id="input-spinner-element"
        className="input-base w-12 text-center !border-none font-bold text-md !ring-0"
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
        disabled={isDisabled}
      />
      <button
        data-test-id="input-spinner-btn-increment"
        className="button-base px-3 hover:enabled:bg-gray-50"
        onClick={() => {
          handleButtonClick("increment")
        }}
        disabled={isDisabled}
      >
        {/* icon plus */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
        >
          <path
            fill="#101111"
            d="M17.5 10a.624.624 0 0 1-.625.625h-6.25v6.25a.624.624 0 1 1-1.25 0v-6.25h-6.25a.625.625 0 1 1 0-1.25h6.25v-6.25a.625.625 0 0 1 1.25 0v6.25h6.25A.625.625 0 0 1 17.5 10Z"
          />
        </svg>
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
