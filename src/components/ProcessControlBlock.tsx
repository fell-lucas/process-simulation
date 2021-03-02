import { useState } from "react"
import { STATUS } from '../constants/ProcessStates'

interface ProcessControlBlockProps {
  pid: number
  programCounter: number
  state: typeof STATUS
  registers: number[]
  // program: Program
}

export function ProcessControlBlock({ ...rest }: ProcessControlBlockProps) {
  const [pid, setPid] = useState(rest.pid)
  const [programCounter, setProgramCounter] = useState(rest.programCounter)
  const [state, setState] = useState(rest.state)



  return (
    <div></div>
  )
}