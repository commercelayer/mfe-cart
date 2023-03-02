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
      className={cn("inline-flex  rounded overflow-hidden", css.inputSpinner, {
        "opacity-50 pointer-events-none": isDisabled,
      })}
    >
      <button
        data-test-id="input-spinner-btn-decrement"
        className="bg-white-300 border text-black hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-l cursor-pointer outline-none"
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
        className=" text-black border w-8  focus:outline-none text-center  bg-white-300 hover:text-black focus:text-black  md:text-basecursor-default flex items-center outline-none"
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
        className="border bg-white-300 text-black hover:text-gray-700 hover:bg-gray-400 h-full w-8 rounded-r cursor-pointer"
        onClick={() => {
          handleButtonClick("increment")
        }}
        disabled={isDisabled}
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
