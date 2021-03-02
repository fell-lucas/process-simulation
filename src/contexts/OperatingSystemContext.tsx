import { createContext, ReactNode, useEffect, useState } from "react";
import { Program } from "../components/Program";
import styles from '../styles/contexts/OperatingSystemContext.module.css'

interface OperatingSystemContextData {
  exec: () => void
  exec10: () => void
  programs: typeof Program[]
}

interface OperatingSystemProviderProps {
  children: ReactNode
}

export const OperatingSystemContext = createContext({} as OperatingSystemContextData)

export function OperatingSystemProvider({ children }:OperatingSystemProviderProps) {
  const [programs, setPrograms] = useState([])
  const [gridDivs, setGridDivs] = useState([])

  function exec() {
    setPrograms(programs.concat(<Program duration={Math.floor((Math.random() * 8) + 3)} />))
  }

  function exec10() {
    setPrograms(programs.concat([
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
      <Program duration={Math.floor((Math.random() * 8) + 3)} />,
    ]
    ))
  }

  return (
    <OperatingSystemContext.Provider value={{
      programs,
      exec,
      exec10
    }}>
      { children }
      <section className={styles.programsContainer}>
        <div className={styles.grid}>
        
        </div>
        {programs}
      </section>
    </OperatingSystemContext.Provider>
  )

}