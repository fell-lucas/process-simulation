import { useEffect, useState } from "react"
import { Program } from "./Program"

interface ProcessControlBlockProps {
  pid: number
  state: number
}

export function ProcessControlBlock({ pid, state}: ProcessControlBlockProps) {
  const [_pid, setPid] = useState(pid)
  const [_state, setState] = useState(state)

  useEffect(() => {
    console.log(_pid)
  }, [])

  return <Program state={_state} duration={Math.floor((Math.random() * 8) + 3)} />
}