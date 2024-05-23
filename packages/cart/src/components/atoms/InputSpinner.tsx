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
  /*
   * availability value returned from current item inventory
   */
  availability?: number
}

export function InputSpinner({
  quantity,
  handleChange,
  debounceMs = 0,
  disabled = false,
  availability,
  ...rest
}: Props): JSX.Element {
  const [internalValue, setInternalValue] = useState<number>(quantity)
  const [internalDisabled, setInternalDisabled] = useState(disabled)
  const { debouncedValue } = useDebounce(internalValue, debounceMs)
  const inputEl = useRef<HTMLInputElement | null>(null)
  const isDisabled = disabled || internalDisabled
  const canIncrease = availability == null || internalValue < availability
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
      className={cn("inline-flex  rounded overflow-hidden", css.inputSpinner, {
        "opacity-50 pointer-events-none": isDisabled,
      })}
    >
      <button
        data-test-id="input-spinner-btn-decrement"
        className="button-base bg-primary text-contrast px-3"
        onClick={() => {
          handleButtonClick("decrement")
        }}
        disabled={isDisabled}
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
          if (value >= 1 && (availability == null || value <= availability)) {
            setInternalValue(value)
          }
        }}
        disabled={isDisabled}
      />
      <button
        data-test-id="input-spinner-btn-increment"
        className={cn("button-base bg-primary text-contrast px-3", {
          "!opacity-50": !canIncrease,
        })}
        onClick={() => {
          handleButtonClick("increment")
        }}
        disabled={isDisabled || !canIncrease}
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
