import { useContext, useEffect, useState } from "react"
import { STATUS } from "../constants/ProcessStates"
import { ProcessQueueContext } from "../contexts/ProcessQueue"
import styles from '../styles/components/ProcessControlBlock.module.css'

interface ProcessControlBlockProps {
  duration: number
  state: number
  pid: number
  priority: number
}

let countdownTimeout: NodeJS.Timeout

export function ProcessControlBlock({ pid, priority, ...rest}:ProcessControlBlockProps) {
  const { tick, nextToRun } = useContext(ProcessQueueContext)

  const [duration, setDuration] = useState(rest.duration)
  const [render, setRender] = useState(true)
  const [width, setWidth] = useState(25)
  const [step, setStep] = useState((100 - width) / rest.duration)
  const [state, setState] = useState(rest.state)
  const [isRunning, setIsRunning] = useState(false)
  const [color, setColor] = useState((Math.random()*0xFFFFFF<<0).toString(16))
  const [quantum, setQuantum] = useState(-1)
  const [quantumAux, setQuantumAux] = useState(quantum)
  const [addedPriority, setAddedPriority] = useState(0)

  useEffect(() => {
    switch (state) {
      case STATUS.NEW:
        setColor(color)
        break;
      case STATUS.READY:
        setColor(color)
        if(nextToRun === pid && !isRunning) {
          setTimeout(() => {
            setState(STATUS.RUNNING)
          }, 10)
        } else {
          setState(STATUS.WAITING)
        }
        setIsRunning(false)
        break;
      case STATUS.RUNNING:
        setColor(color)
        setQuantumAux(quantum)
        setIsRunning(true)
        break;
      case STATUS.WAITING:
        setColor(color)
        if(nextToRun === pid && !isRunning) {
          setTimeout(() => {
            setState(STATUS.RUNNING)
          }, 10)
        }
        setIsRunning(false)
        break;
      case STATUS.DEAD:
        setColor('000000')
        setIsRunning(false)
        setTimeout(() => {
          setRender(false)
        }, 2000)
        break;
      case STATUS.BLOCKED:
        setColor('ff0000')
        setTimeout(() => {
          setColor(color)
        }, 50)
        setIsRunning(false)
        if(nextToRun === pid && !isRunning) {
          setTimeout(() => {
            setState(STATUS.RUNNING)
            
          }, 10)
        }
        break;
    }
    
  }, [tick])

  useEffect(() => {
    setColor(color)
    if(duration > 0 && state === STATUS.RUNNING && quantumAux > 0) {
      countdownTimeout = setTimeout(() => {
        setQuantumAux(quantumAux - 1)
        if(quantumAux === 1) {
          setState(STATUS.WAITING)
          if(Math.floor(Math.random() * 100) < 10) {
            setState(STATUS.BLOCKED)
            setAddedPriority(Math.floor(Math.random() * 5 + 5))
            priority += addedPriority
          }
        }
        setWidth(width + step)
        setDuration(duration - 1)
      }, 100)
    } else if (duration === 0) {
      setState(STATUS.DEAD)
    }
  }, [duration, isRunning])

  useEffect(() => {
    setState(STATUS.READY)
    setQuantum(4)
    setQuantumAux(4)
  }, [])
  
  return (
    <>
      { render && (
        <div 
          style={{
            transition: `width linear 0.2s`,
            width: `${width}%`,
            background: `${'#'+ color}`}} 
          className={styles.container}>
          <span>
            P: { `${priority} (+${addedPriority})` }
          </span>
          <span>
            {duration}s
          </span>
          <span>{Object.keys(STATUS).find(k => STATUS[k] === state)}</span>
        </div>
      )}
    </>
  )
}

