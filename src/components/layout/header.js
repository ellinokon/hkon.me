import React from 'react'
import { Link } from 'gatsby'

import styles from './layout.module.css'

export default ({ siteTitle }) => (
  <header className={styles.header}>
    <h1 className={styles.title}>
      {siteTitle}
    </h1>

    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link to="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/#blog">Blog</Link>
        </li>
      </ul>
    </nav>
  </header>
)
