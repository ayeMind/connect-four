import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Error404.module.scss'

const Error404: FC = () => {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>Page not found</p>
      <Link to="/" className={styles.return}>Go Home</Link>
    </div>
  )
}

export { Error404 }