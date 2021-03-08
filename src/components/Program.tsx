import { useEffect, useState } from "react"
import { STATUS } from "../constants/ProcessStates"
import styles from '../styles/components/Program.module.css'

interface ProgramProps {
  duration: number
  state: number
}

let countdownTimeout: NodeJS.Timeout

export function Program({...rest}:ProgramProps) {
  const [duration, setDuration] = useState(rest.duration)
  const [render, setRender] = useState(true)
  const [width, setWidth] = useState(20)
  const [step, setStep] = useState(Math.floor((105 - width) / rest.duration))
  const [state, setState] = useState(rest.state)
  const [isRunning, setIsRunning] = useState(false)
  const [color, setColor] = useState((Math.random()*0xFFFFFF<<0).toString(16))

  useEffect(() => {
    switch (state) {
      case STATUS.NEW:
        break;
      case STATUS.READY:
        setTimeout(() => {
          setState(STATUS.RUNNING)
          // console.log(step)
        }, 10)
        break;
      case STATUS.RUNNING:
        setIsRunning(true)
        break;
      default:
        break;
    }
    
  }, [state])

  useEffect(() => {
    if(duration > 0 && state === STATUS.RUNNING) {
      countdownTimeout = setTimeout(() => {
        setWidth(width + step)
        setDuration(duration - 1)
      }, 1000)
    } else if (duration === 0) {
      setRender(false)
    }
  }, [duration, isRunning])

  return (
    <>
      { render && (
        <div 
          style={{
            transition: `width linear 1s`,
            width: `${width}%`,
            background: `${'#'+ color}`}} 
          className={styles.container}>
          <span>
            I'm a program
          </span>
          <span>
            {duration}s
          </span>
          <span>{state}</span>
        </div>
      )}
    </>
  )
}