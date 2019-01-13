import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostHeader from '../components/post-header'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <PostHeader {...post.frontmatter} />

      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        tags
        lead
      }
    }
  }
`
