import React from 'react'
import { Link } from 'gatsby'

import styles from './post.module.css'

export default ({ fields, frontmatter }) => (
  <article className={styles.postSnippet}>
    <Link to={fields.slug}>
      <h3 className={styles.title}>{frontmatter.title}</h3>
      <p className={styles.snippetLead}>{frontmatter.lead}</p>
      <time className={styles.date}>{frontmatter.date}</time> {' '}
      <span className={styles.more}>&middot; Read more &raquo;</span>
    </Link>
  </article>
)
