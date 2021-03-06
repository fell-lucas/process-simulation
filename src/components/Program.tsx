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
  const [easing, setEasing] = useState(rest.duration)
  const [where, setWhere] = useState(0)
  const [state, setState] = useState(rest.state)

  useEffect(() => {
    switch (state) {
      case STATUS.NEW:
        break;
      case STATUS.READY:
        setTimeout(() => {
          startMoving()
        }, 10)

        break;
      case STATUS.RUNNING:
        break;
      default:
        break;
    }
    
  }, [state])

  function startMoving() {
    setWhere(800)
  }

  useEffect(() => {
    if(duration > 0 && state === STATUS.RUNNING) {
      countdownTimeout = setTimeout(() => {
        setDuration(duration - 1)
      }, 1000)
    } else if (duration === 0) {
      setRender(false)
    }
  }, [duration])

  return (
    <>
      { render && (
        <div 
          style={{
            transition: `linear ${easing}s`,
            transform:`translate(${where}px)`,
            background: `${'#'+(Math.random()*0xFFFFFF<<0).toString(16)}`}} 
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