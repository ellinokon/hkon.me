import React from 'react'

import styles from './post.module.css'

export default ({ date, lead, tags, title }) => (
  <>
    <header className={styles.postHeader}>
      <time className={styles.date}>{date}</time>

      <h1 className={styles.title}>{title}</h1>

      <span className={styles.more}>
        Tags: {tags.join(', ')}
      </span>
    </header>

    <p className={styles.lead}>{lead}</p>
  </>
)
