import { useContext, useState } from "react"
import { ProcessQueueContext } from "../contexts/ProcessQueue"
import styles from '../styles/components/Actions.module.css'

export function Actions() {
  const { add } = useContext(ProcessQueueContext)
  const [btnDisabled, setBtnDisabled] = useState(false)


  function lockButton() {
    add()
    // setBtnDisabled(true)
    // setTimeout(() => {
    //   setBtnDisabled(false)
    // }, 1500)
  }

  return (
    <div className={styles.container}>
      <button disabled={btnDisabled} type="button" onClick={lockButton}>Spawn new program</button>
      {/* <button type="button" onClick={add10}>Spawn 10 new programs</button> */}
    </div>
  )
}