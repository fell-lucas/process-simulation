import Head from 'next/head'
import { useContext } from 'react'
import { Actions } from '../components/Actions'
import { Program } from '../components/Program'
import { OperatingSystemContext, OperatingSystemProvider } from '../contexts/OperatingSystemContext'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const { exec } = useContext(OperatingSystemContext)

  return (
    <OperatingSystemProvider>
      <Head>
        <title>OS Process Simulator</title>
      </Head>
      
      <div className={styles.container}>
        <h1>OS Process Simulator</h1>
        <Actions />
        <section>
          <Program color="green" duration={5} />
        </section> 
      </div>
    </OperatingSystemProvider>
  )
}
