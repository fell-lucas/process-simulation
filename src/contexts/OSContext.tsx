import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface OSContextData {
  currentPid: number
  updatePid: () => void
}

interface OSProviderProps {
  children: ReactNode
}

export const OSContext = createContext({} as OSContextData)

export function OSContextProvider({ children }:OSProviderProps) {
  const [currentPid, setCurrentPid] = useState(0)

  function updatePid() {
    setCurrentPid(currentPid + 1)
  }

  return (
    <OSContext.Provider value={{
      currentPid,
      updatePid
    }}>
      {/* <div className={styles.container}> */}
        {children}
      {/* </div> */}
    </OSContext.Provider>
  )

}