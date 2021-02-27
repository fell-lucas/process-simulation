import { useContext } from "react"
import { OperatingSystemContext } from "../contexts/OperatingSystemContext"

export function Actions() {
  const { exec } = useContext(OperatingSystemContext)
  
  return (
    <button type="button" onClick={exec}>Spawn new program</button>
  )
}