import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { Actions } from '../components/Actions'
import { Program } from '../components/Program'
import { OperatingSystemContext, OperatingSystemProvider } from '../contexts/OperatingSystemContext'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const { exec, programs } = useContext(OperatingSystemContext)

  return (
    <>
      <div className={styles.container}>
        <OperatingSystemProvider>
          <Head>
            <title>OS Process Simulator</title>
          </Head>
            <h1>OS Process Simulator</h1>
            <Actions />
        </OperatingSystemProvider>
      </div>
    </>
  )
}
