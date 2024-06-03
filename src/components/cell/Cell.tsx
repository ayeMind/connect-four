import { FC } from 'react'
import styles from './Cell.module.scss'
import store from 'app/store'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'

interface CellProps {
  id: string
}

const Cell: FC<CellProps> = observer(({ id }) => {

  const moves = store.getPossibleMoves()
  
  const handleClick = (event: React.MouseEvent) => {

    const target = event.target as HTMLDivElement
    const targetY = target.getBoundingClientRect().y

    if (moves.includes(id)) {
      const cellRow = store.move(id)

      if (cellRow === false) {
        return
      }

      const cellCol = Number(id.split("-")[1])
      const cellId = `${cellRow}-${cellCol}`
      const cell = document.getElementById(cellId)

      if (!cell) {
        return
      }

      const cellY = cell.getBoundingClientRect().y
      cell.animate(
        [
          { transform: `translateY(${targetY - cellY  }px)` },
          { transform: `translateY(0px)` }
        ],
        {
          duration: Math.abs(targetY - cellY),
        }
      )
      cell.classList.toggle(styles[store.currentPlayer])
      // console.log(store.checkHorizontal(cellRow, cellCol));
      
      store.checkWin(cellId).then((res) => {
        if (res) {
          store.gameOver()
        }
        store.togglePlayer()
      })
    }
}

  return (
    <div className={styles.cell}>
      <motion.div id={id} className={styles.cell}
        onClick={handleClick} />
    </div>
  )
})

export { Cell }