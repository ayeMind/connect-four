import { FC } from 'react'
import styles from './Cell.module.scss'
import store from 'app/store'
import { observer } from 'mobx-react-lite'

interface CellProps {
  id: string
}

const Cell: FC<CellProps> = observer(({ id }) => {

  const moves = store.getPossibleMoves()
  
  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement
    if (moves.includes(id)) {
      store.move(id)
      target.classList.toggle(styles[store.currentPlayer])
      store.togglePlayer()
    }
}

  return (
    <div className={styles.cell}
      onClick={handleClick} />
  )
})

export { Cell }