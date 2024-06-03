import { FC } from 'react'
import styles from './Cell.module.scss'
import store from 'app/store'

interface CellProps {
  row: number
  col: number
}

const Cell: FC<CellProps> = ({ row, col }) => {

  const { field, currentPlayer, togglePlayer } = store
  const cellId = `${row}-${col}`

  const handleClick = () => {
    togglePlayer()
    console.log(cellId)
  }

  return (
    <div className={styles.cell}
      onClick={handleClick} />
  )
}

export { Cell }