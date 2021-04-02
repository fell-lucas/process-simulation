import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ProcessControlBlock, ProcessControlBlockProps } from "../components/ProcessControlBlock";
import { STATUS } from "../constants/ProcessStates";
import styles from '../styles/contexts/ProcessQueue.module.css'

interface ProcessQueueContextData {
  add: () => void
  queue: typeof ProcessControlBlock[]
  updtNextToRun: () => void
  nextToRun: number
  tick: number
  update: ({} : ProcessControlBlockProps) => void
}

interface ProcessQueueProviderProps {
  children: ReactNode
}

export const ProcessQueueContext = createContext({} as ProcessQueueContextData)

export function ProcessQueueProvider({ children }:ProcessQueueProviderProps) {
  
  const [currentPid, setCurrentPid ] = useState(0)
  const [queue, setQueue] = useState([])
  const [tick, setTick] = useState(0)
  const [nextToRun, setNextToRun] = useState(0)

  function add() {
    setQueue(queue.concat(<ProcessControlBlock 
      key={currentPid} 
      pid={currentPid} 
      state={STATUS.NEW} 
      priority={Math.floor((Math.random() * 20) + 1)}
      duration={Math.floor((Math.random() * 20) + 10)} 
      />)
    )
    setCurrentPid(currentPid + 1)
  }

  function update({ state, pid, duration, priority }:ProcessControlBlockProps) {
    setQueue(queue)
    const q = queue.forEach(function (e, idx, obj) {
      obj.splice(idx, 1, <ProcessControlBlock state={state} pid={pid} duration={duration} priority={priority} />)
      })
      // })((e) => (e)<ProcessControlBlock state={state} pid={pid} duration={duration} priority={priority} />)
    console.log(q)
  }

  function updtNextToRun() {
    const next = queue.filter((e) => (e['props'].state !== STATUS.DEAD))[0]
    setNextToRun(next ? next['props'].pid : 0)
  }

  useEffect(() => {
    setTimeout(() => {
      setTick(tick + 1)
      updtNextToRun()
      queue.sort((a, b) => (b['props'].priority - a['props'].priority))
    }, 100)
  }, [tick])

  return (
    <ProcessQueueContext.Provider value={{
      queue,
      add,
      updtNextToRun,
      nextToRun,
      tick,
      update
    }}>
      { children }
      <section className={`${styles.programsContainer}`}>
        {queue}
      </section>
    </ProcessQueueContext.Provider>
  )
}