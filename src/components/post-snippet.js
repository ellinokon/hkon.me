import React from 'react'
import { Link } from 'gatsby'

import styles from './post.module.css'

export default ({ fields, frontmatter }) => (
  <article className={styles.postSnippet}>
    <Link to={fields.slug}>
      <time className={styles.date}>{frontmatter.date}</time>

      <h3 className={styles.title}>{frontmatter.title}</h3>

      <span className={styles.more}>Read more &raquo;</span>
    </Link>
  </article>
)
