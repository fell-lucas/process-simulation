import Head from 'next/head'
import { Actions } from '../components/Actions'
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
        <ProcessQueueProvider> 
          <Actions />
          <h2>Queue</h2>
        </ProcessQueueProvider>
      </div>
    </>
  )
}
