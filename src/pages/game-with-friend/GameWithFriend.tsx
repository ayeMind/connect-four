import { Layout } from 'components/layout'
import { FC } from 'react'
import styles from './GameWithFriend.module.scss'
import { Field } from 'components/field'
import { observer } from 'mobx-react-lite'
import store from 'app/store'

const GameWithFriend: FC = observer(() => {

  const { currentPlayer } = store

  return (
    <Layout className={styles.page}>
      <h2 className={styles["current-player"]}>Current player: {currentPlayer}</h2>
      <Field />
    </Layout>
  )
})

export { GameWithFriend }