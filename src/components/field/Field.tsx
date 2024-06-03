import { FC } from 'react'
import styles from './Field.module.scss'

import { Cell } from 'components/cell'
import { observer } from 'mobx-react-lite'

import store from 'app/store'

const initialField = store.field

const fieldRows = initialField.map((row, i) => 
    <div key={i} className={styles.row}>
        {row.map((_, j) => <Cell key={`${i}-${j}`} id={`${i}-${j}`} />)}
    </div>)

const Field: FC = observer(() => {
  return (
    <div className={styles.field}>
      {fieldRows}
    </div>
  )
})


export { Field }