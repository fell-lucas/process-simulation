import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProcessControlBlock } from "../components/ProcessControlBlock";
import styles from '../styles/contexts/ProcessQueue.module.css'
import { OSContext } from "./OSContext";

interface ProcessQueueContextData {
  add: () => void
  queue: typeof ProcessControlBlock[]
  managedState: number
}

interface ProcessQueueProviderProps {
  children: ReactNode
  managedState: number
}

export const ProcessQueueContext = createContext({} as ProcessQueueContextData)

export function ProcessQueueProvider({ children, managedState }:ProcessQueueProviderProps) {
  const [queue, setQueue] = useState([])
  const { currentPid, updatePid } = useContext(OSContext)

  function add() {
    setQueue(queue.concat(<ProcessControlBlock key={currentPid} pid={currentPid} state={managedState} />))
    updatePid()
  }

  return (
    <ProcessQueueContext.Provider value={{
      queue,
      add,
      managedState
    }}>
      <div className={`${styles.queueContainer} queueContainer_${managedState}`}>
        { children }
        <section className={`${styles.programsContainer} queue_${managedState}`}>
          {queue}
        </section>
      </div>
    </ProcessQueueContext.Provider>
  )
}