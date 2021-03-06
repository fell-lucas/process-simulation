import { useContext } from "react"
import { OSContext } from "../contexts/OSContext"
import { ProcessQueueContext } from "../contexts/ProcessQueue"
import styles from '../styles/components/Actions.module.css'

export function Actions() {
  const { add } = useContext(ProcessQueueContext)

  return (
    <div className={styles.container}>
      <button type="button" onClick={add}>Spawn new program</button>
      {/* <button type="button" onClick={exec10}>Spawn 10 new programs</button> */}
    </div>
  )
}