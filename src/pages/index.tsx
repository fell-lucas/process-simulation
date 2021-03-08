import Head from 'next/head'
import { Actions } from '../components/Actions'
import { STATUS } from '../constants/ProcessStates'
import { OSContextProvider } from '../contexts/OSContext'
import { ProcessQueueProvider } from '../contexts/ProcessQueue'
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
          <ProcessQueueProvider managedState={STATUS.READY}> 
            <Actions />
            <h2>Ready queue</h2>
          </ProcessQueueProvider>
        </OSContextProvider>
      </div>
    </>
  )
}
