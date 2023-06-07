import {
  LineItemOptions as LineItemOptionsComponent,
  LineItemOption,
} from "@commercelayer/react-components"
import { FC } from "react"

export const isObjectEmpty = (objectName: any) => {
  return Object.keys(objectName).length === 0
}

export const LineItemOptionsAtributes: FC = () => {
  const LineItemOptionsNames = ({ lineItemOption }: any) => {
    const { name, metadata } = lineItemOption
    if (!isObjectEmpty(metadata)) return null

    return (
      <ol
        className="font-normal text-xs leading-5 text-gray-400"
        style={{ listStyleType: "disc" }}
      >
        <li>{name}</li>
      </ol>
    )
  }

  return (
    <LineItemOptionsComponent
      showAll
      showName={false}
      data-test-id="line-item-options"
    >
      <LineItemOption data-test-id="item-option">
        {({ lineItemOption }) => {
          if (lineItemOption) {
            return <LineItemOptionsNames lineItemOption={lineItemOption} /> // your custom UI
          } else {
            return null
          }
        }}
      </LineItemOption>
    </LineItemOptionsComponent>
  )
}

export const LineItemOptions = ({ LineItem }: any) => {
  const LineItemOptionsAtributes = ({ lineItemOption }: any) => {
    const { name, metadata } = lineItemOption
    const { Left, Right } = metadata

    return (
      <div className="pt-2 space-y-2">
        {Right && (
          <div className="flex items-start">
            <div className="w-28">
              <span className="font-normal text-xxs leading-5 text-gray-400">
                {"Right Eye (OD)"}
              </span>
            </div>
            <div className="flex justify-start  w-9/12 flex-wrap">
              {Object.keys(Right).map((oneKey, i) => {
                return (
                  <div key={i} className="pl-4">
                    <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
                      {oneKey}:{" "}
                    </span>
                    <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                      {Right[oneKey]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
        {Left && (
          <div className="flex items-start">
            <div className="w-28">
              <span className="font-normal text-xxs leading-5 text-gray-400">
                {"Left Eye (OS)"}
              </span>
            </div>

            <div className="flex w-9/12 flex-wrap">
              {Object.keys(Left).map((oneKey, i) => {
                return (
                  <div key={i} className="pl-4">
                    <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
                      {oneKey}:{" "}
                    </span>
                    <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
                      {Left[oneKey]}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    )

    // switch (name) {
    //   case "Progressive / Bifocal":
    //     return (
    //       <div className="pt-2 space-y-2">
    //         <div className="flex items-start">
    //           <div className="w-28">
    //             <span className="font-normal text-xxs leading-5 text-gray-400">
    //               {"Right Eye (OD)"}
    //             </span>
    //           </div>
    //           <div className="flex justify-start  w-9/12 flex-wrap">
    //             {Object.keys(Right).map((oneKey, i) => {
    //               return (
    //                 <div key={i} className="pl-4">
    //                   <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
    //                     {oneKey}:{" "}
    //                   </span>
    //                   <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
    //                     {Right[oneKey]}
    //                   </span>
    //                 </div>
    //               )
    //             })}
    //           </div>
    //         </div>
    //         <div className="flex items-start">
    //           <div className="w-28">
    //             <span className="font-normal text-xxs leading-5 text-gray-400">
    //               {"Left Eye (OS)"}
    //             </span>
    //           </div>

    //           <div className="flex w-9/12 flex-wrap">
    //             {Object.keys(Left).map((oneKey, i) => {
    //               return (
    //                 <div key={i} className="pl-4">
    //                   <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
    //                     {oneKey}:{" "}
    //                   </span>
    //                   <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
    //                     {Left[oneKey]}
    //                   </span>
    //                 </div>
    //               )
    //             })}
    //           </div>
    //         </div>
    //       </div>
    //     )

    //   case "Contact Lens Prescription":
    //     return (
    //       <div className="pt-2 space-y-2">
    //         {Right && (
    //           <div className="flex items-start">
    //             <div className="w-28">
    //               <span className="font-normal text-xxs leading-5 text-gray-400">
    //                 {"Right Eye (OD)"}
    //               </span>
    //             </div>
    //             <div className="flex justify-start  w-9/12 flex-wrap">
    //               {Object.keys(Right).map((oneKey, i) => {
    //                 return (
    //                   <div key={i} className="pl-4">
    //                     <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
    //                       {oneKey}:{" "}
    //                     </span>
    //                     <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
    //                       {Right[oneKey]}
    //                     </span>
    //                   </div>
    //                 )
    //               })}
    //             </div>
    //           </div>
    //         )}
    //         {Left && (
    //           <div className="flex items-start">
    //             <div className="w-28">
    //               <span className="font-normal text-xxs leading-5 text-gray-400">
    //                 {"Left Eye (OS)"}
    //               </span>
    //             </div>

    //             <div className="flex w-9/12 flex-wrap">
    //               {Object.keys(Left).map((oneKey, i) => {
    //                 return (
    //                   <div key={i} className="pl-4">
    //                     <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
    //                       {oneKey}:{" "}
    //                     </span>
    //                     <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
    //                       {Left[oneKey]}
    //                     </span>
    //                   </div>
    //                 )
    //               })}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     )
    //   default:
    //     return (
    //       <div className="pt-2 space-y-2">
    //         {Right && (
    //           <div className="flex items-start">
    //             <div className="w-28">
    //               <span className="font-normal text-xxs leading-5 text-gray-400">
    //                 {"Right Eye (OD)"}
    //               </span>
    //             </div>
    //             <div className="flex justify-start  w-9/12 flex-wrap">
    //               {Object.keys(Right).map((oneKey, i) => {
    //                 return (
    //                   <div key={i} className="pl-4">
    //                     <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
    //                       {oneKey}:{" "}
    //                     </span>
    //                     <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
    //                       {Right[oneKey]}
    //                     </span>
    //                   </div>
    //                 )
    //               })}
    //             </div>
    //           </div>
    //         )}
    //         {Left && (
    //           <div className="flex items-start">
    //             <div className="w-28">
    //               <span className="font-normal text-xxs leading-5 text-gray-400">
    //                 {"Left Eye (OS)"}
    //               </span>
    //             </div>

    //             <div className="flex w-9/12 flex-wrap">
    //               {Object.keys(Left).map((oneKey, i) => {
    //                 return (
    //                   <div key={i} className="pl-4">
    //                     <span className="font-semibold uppercase text-xxs leading-5 text-gray-700">
    //                       {oneKey}:{" "}
    //                     </span>
    //                     <span className="pl-2 font-normal text-xs leading-5 text-gray-400">
    //                       {Left[oneKey]}
    //                     </span>
    //                   </div>
    //                 )
    //               })}
    //             </div>
    //           </div>
    //         )}
    //       </div>
    //     )
    // }
  }

  return (
    <LineItemOptionsComponent
      showAll
      showName={false}
      data-test-id="line-item-options"
    >
      <LineItemOption data-test-id="item-option">
        {({ lineItemOption }) => {
          if (lineItemOption) {
            return <LineItemOptionsAtributes lineItemOption={lineItemOption} /> // your custom UI
          } else {
            return null
          }
        }}
      </LineItemOption>
    </LineItemOptionsComponent>
  )
}

export const LineItemOptionsRespone: FC = () => {
  const LineItemOptionsAtributes = ({ lineItemOption }: any) => {
    const { name, metadata } = lineItemOption
    const { Left, Right } = metadata
    switch (name) {
      case "Progressive / Bifocal":
        return (
          <div className="pt-2">
            <div className="flex items-start">
              <div style={{ width: "30%" }}></div>
              <div style={{ width: "70%", paddingLeft: "10px" }}>
                <div className="flex flex-wrap">
                  {Object.keys(Right).map((oneKey, i) => {
                    return (
                      <div key={i} className="pl-2">
                        <span
                          style={{ fontSize: "10px" }}
                          className="font-semibold leading-5 uppercase text-gray-700"
                        >
                          {oneKey}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div style={{ width: "30%" }}>
                <span
                  style={{ fontSize: "10px" }}
                  className="font-normal leading-5 text-gray-400"
                >
                  {"Right Eye (OD)"}
                </span>
              </div>
              <div style={{ width: "70%" }}>
                <div className="flex flex-wrap">
                  {Object.keys(Right).map((oneKey, i) => {
                    return (
                      <div key={i} className="pl-4">
                        <span
                          style={{ fontSize: "10px" }}
                          className="font-normal leading-5 text-gray-400"
                        >
                          {Right[oneKey]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <div style={{ width: "30%" }}>
                <span
                  style={{ fontSize: "10px" }}
                  className="font-normal leading-5 text-gray-400"
                >
                  {"Left Eye (OS)"}
                </span>
              </div>
              <div style={{ width: "70%" }}>
                <div className="flex flex-wrap">
                  {Object.keys(Left).map((oneKey, i) => {
                    return (
                      <div key={i} className="pl-4">
                        <span
                          style={{ fontSize: "10px" }}
                          className="font-normal leading-5 text-gray-400"
                        >
                          {Left[oneKey]}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <LineItemOptionsComponent
      showAll
      showName={false}
      data-test-id="line-item-options"
    >
      <LineItemOption data-test-id="item-option">
        {({ lineItemOption }) => {
          if (lineItemOption) {
            return <LineItemOptionsAtributes lineItemOption={lineItemOption} /> // your custom UI
          } else {
            return null
          }
        }}
      </LineItemOption>
    </LineItemOptionsComponent>
  )
}
