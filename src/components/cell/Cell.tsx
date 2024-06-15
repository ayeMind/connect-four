import { FC, useEffect } from 'react'
import styles from './Cell.module.scss'
import store from 'app/store'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'

interface CellProps {
  id: string
}

const Cell: FC<CellProps> = observer(({ id }) => {

  const onResetGame = () => {
    const cells = document.querySelectorAll(`.${styles.cell}`)

    cells.forEach((cell) => {
      cell.className = styles.cell
    })
  }

  useEffect(() => {
    document.addEventListener('game-reset', onResetGame) // event from GameWithFriend

    return () => {
      document.removeEventListener('game-reset', onResetGame)
    }
  }, [])

  const moves = store.getPossibleMoves()
  if (moves.length === 0) {
    store.gameOver("draw")
  }
  
  const handleClick = (event: React.MouseEvent) => {

    if (store.gameIsOver) {
      return
    }

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
          store.gameOver(store.currentPlayer)
          const cells = document.querySelectorAll(`.${styles.cell}`)
          cells.forEach((cell) => {
            cell.classList.add(styles.end)
          })
        } else {
          store.togglePlayer()
        }
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