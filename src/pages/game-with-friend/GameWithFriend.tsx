import { Layout } from 'components/layout'
import { FC, useEffect } from 'react'
import styles from './GameWithFriend.module.scss'
import { Field } from 'components/field'
import { observer } from 'mobx-react-lite'
import store from 'app/store'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const GameWithFriend: FC = observer(() => {

  useEffect(() => {
    store.reset()
  }, [])

  const { currentPlayer } = store

  let text = `Current player: ${currentPlayer}` 
  if (store.winner === "draw") {
    text = "Draw!"
  } else if (store.winner) {
    text = `${store.winner[0].toUpperCase() + store.winner.slice(1)} won!`
  }

  const resetGame = () => {
    store.reset()
    const event = new CustomEvent('game-reset')
    document.dispatchEvent(event)
  }

  return (
    <Layout className={styles.page}>
      <h2 className={styles["current-player"]}>{text}</h2>
      <Field />
      {store.gameIsOver && (
        <motion.div className={styles.buttons} initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.5 } }} > 
          <Link className={styles.btn} to="/" onClick={store.reset}>Back</Link>
          <button className={styles.btn} onClick={resetGame}>Reset</button>
        </motion.div>
      )}
    </Layout>
  )
})

export { GameWithFriend }