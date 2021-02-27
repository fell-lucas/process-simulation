import { useState } from "react"
import styles from '../styles/components/Program.module.css'

interface ProgramProps {
  duration: number
  // size: number
  color: string
}

export function Program({...rest}:ProgramProps) {
  const [color, setColor] = useState(rest.color)
  const [duration, setDuration] = useState(rest.duration)

  // function 

  return (
    <div className={styles.container}>
      <span>
        I'm a program
      </span>
      <span>
        {duration}s
      </span>
    </div>
  )
}