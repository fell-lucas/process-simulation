import Head from 'next/head'
import { Actions } from '../components/Actions'
import { STATUS } from '../constants/ProcessStates'
import { OSContext, OSContextProvider } from '../contexts/OSContext'
import { ProcessQueueContext, ProcessQueueProvider } from '../contexts/ProcessQueue'
import styles from '../styles/pages/Home.module.css'

export default function Home() {

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>OS Process Simulator</title>
        </Head>
        <h1 className={styles.title}>OS Process Simulator</h1>
        <OSContextProvider>
          <div className={styles.queues}>
            <ProcessQueueProvider managedState={STATUS.WAITING}> 
              {/* <Actions /> */}
              <h2>Waiting queue</h2>
            </ProcessQueueProvider>
            <ProcessQueueProvider managedState={STATUS.READY}> 
              <Actions />
              <h2>Ready queue</h2>
            </ProcessQueueProvider>
          </div>
        </OSContextProvider>
      </div>
    </>
  )
}
