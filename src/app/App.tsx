import { FC } from 'react'
import styles from './App.module.scss'
import { Layout } from 'components/layout'
import { Link } from 'react-router-dom'

const App: FC = () => {
  return (
    <Layout className={styles.page}>
      <h1 className={styles.title}>Connect Four!</h1>
      <p className={styles.text}>Play with your friend or against the computer</p>
      <div className={styles.buttons}>
        <Link to="/friend" className={styles.button}>Play with friend</Link>
        <Link to="/computer" className={styles.button}>Play with computer</Link>
      </div>
    </Layout>
  )
}

export { App }