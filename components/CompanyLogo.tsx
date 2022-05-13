import { LogoCL } from "@commercelayer/react-utils"

import { useSettings } from "./SettingsProvider"
import { SkeletonItem } from "./Skeleton/Item"

export const CompanyLogo = () => {
  const { isLoading, settings } = useSettings()

  return (
    <>
      {isLoading ? (
        <SkeletonItem className="w-2/12 h-[40px]" />
      ) : settings.logoUrl ? (
        <img
          src={settings.logoUrl}
          alt={settings.companyName}
          className="h-[40px]"
        />
      ) : settings.companyName ? (
        <div className="font-semibold text-2xl h-[40px] uppercase">
          {settings.companyName}
        </div>
      ) : (
        <div>
          <LogoCL height="40px" className="text-black" />
        </div>
      )}
    </>
  )
}
