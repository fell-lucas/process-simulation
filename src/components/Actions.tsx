import { useContext } from "react"
import { OperatingSystemContext } from "../contexts/OperatingSystemContext"
import styles from '../styles/components/Actions.module.css'

export function Actions() {
  const { exec, exec10 } = useContext(OperatingSystemContext)
  
  return (
    <div className={styles.container}>
      <button type="button" onClick={exec}>Spawn new program</button>
      <button type="button" onClick={exec10}>Spawn 10 new programs</button>
    </div>
  )
}