import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Program } from "../components/Program";
import { STATUS } from "../constants/ProcessStates";
import styles from '../styles/contexts/ProcessQueue.module.css'

interface ProcessQueueContextData {
  add: () => void
  queue: typeof Program[]
  updtNextToRun: () => void
  nextToRun: number
  tick: number
}

interface ProcessQueueProviderProps {
  children: ReactNode
}

export const ProcessQueueContext = createContext({} as ProcessQueueContextData)

export function ProcessQueueProvider({ children }:ProcessQueueProviderProps) {
  
  const [currentPid, setCurrentPid ] = useState(0)
  const [queue, setQueue] = useState([])
  const [tick, setTick] = useState(0)
  const [nextToRun, setNextToRun] = useState(currentPid)

  function add() {
    setQueue(queue.concat(<Program 
      key={currentPid} 
      pid={currentPid} 
      state={STATUS.NEW} 
      priority={Math.floor((Math.random() * 20) + 1)}
      // duration={Math.floor((Math.random() * 20) + 10)} 
      duration={30} 
      />)
    )
    setCurrentPid(currentPid + 1)
  }

  function updtNextToRun() {
    const next = Math.floor(Math.random() * queue.length)
    // const next = queue.filter((e) => (e['props'].priority))
    setNextToRun(next)
  }

  useEffect(() => {
    setTimeout(() => {
      setTick(tick + 1)
      updtNextToRun()
      // queue.sort((a, b) => (a['props'].duration - b['props'].duration))
      // queue.forEach(function (e, idx, obj) {
      //   console.log(e, idx, obj)
      //   if(e['props'].state === STATUS.DEAD) {
      //     obj.splice(idx, 1)
      //   }
      // })
    }, 100)
  }, [tick])

  return (
    <ProcessQueueContext.Provider value={{
      queue,
      add,
      updtNextToRun,
      nextToRun,
      tick
    }}>
      { children }
      <section className={`${styles.programsContainer}`}>
        {queue}
      </section>
    </ProcessQueueContext.Provider>
  )
}