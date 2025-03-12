/* eslint-disable react-refresh/only-export-components */
'use client'

import { useSiteConfig } from '@repo/api/site-config/get'
import { SiteConfig } from '@repo/typescript-config/types/api'
import React, { createContext, useContext, useEffect, useState } from 'react'

type InitialState = {
  siteConfig?: SiteConfig
  setSiteConfig?: (siteConfig: SiteConfig) => void
}

const initialState = {
  siteConfig: undefined,
  setSiteConfig: () => {},
}

const Context = createContext<InitialState>(initialState)

export const DataContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { data: siteData, isSuccess: isSiteDataSuccess } = useSiteConfig({})
  const [siteConfig, setSiteConfig] = useState<SiteConfig | undefined>()

  useEffect(() => {
    if (isSiteDataSuccess) {
      setSiteConfig(siteData)
    }
  }, [isSiteDataSuccess, siteData])

  return (
    <Context.Provider
      value={{
        siteConfig,
        setSiteConfig,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useDataContext = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error(
      'useDataContext Hook must be used within the editor Provider',
    )
  }
  return context
}
