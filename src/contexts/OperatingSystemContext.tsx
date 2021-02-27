import { createContext, ReactNode, useEffect } from "react";
import { Program } from "../components/Program";

interface OperatingSystemContextData {
  exec: () => void
}

interface OperatingSystemProviderProps {
  children: ReactNode
}

export const OperatingSystemContext = createContext({} as OperatingSystemContextData)

export function OperatingSystemProvider({ children }:OperatingSystemProviderProps) {

  function exec() {
    console.log('program executed')
  }

  return (
    <OperatingSystemContext.Provider value={{
      exec
    }}>
      { children }
    </OperatingSystemContext.Provider>
  )

}