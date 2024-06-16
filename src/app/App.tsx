import { FC } from 'react'
import styles from './App.module.scss'
import { Layout } from 'components/layout'
import { Link } from 'react-router-dom'

const App: FC = () => {
  return (
    <Layout className={styles.page}>
      <h1 className={styles.title}>Connect Four!</h1>
      <div className={styles.buttons}>
        <Link to="/game" className={styles.button}>Start</Link>
      </div>
      <p className={styles.text}>Connect four is a tic-tac-toe-like two-player game.</p>
      <p className={styles.text}>Drop colored discs into a grid to form a line of four in a race against your opponent.</p>
    </Layout>
  )
}

export { App }