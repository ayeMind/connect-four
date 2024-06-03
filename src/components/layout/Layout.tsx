import React, { FC } from 'react'
import styles from './Layout.module.scss'

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ children, className, ...props }) => {
  return (
    <main className={styles.main + ' ' + className} {...props}>
        {children}
    </main>
  )
}

export { Layout }
