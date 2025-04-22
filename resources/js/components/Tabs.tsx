"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"

interface TabsContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const TabsContext = createContext<TabsContextType>({
  activeTab: "tab1",
  setActiveTab: () => {},
})

export const useTabsContext = () => useContext(TabsContext)

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  defaultTab: string
  className?: string
}

const Tabs: React.FC<TabsProps> = ({ children, defaultTab, className = "", ...props }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

// Static properties for easy access in components
Tabs.activeTab = "tab1"
Tabs.setActiveTab = (tab: string) => {}

export default Tabs
