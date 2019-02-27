import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Main from '../components/main'
import PostHeader from '../components/post-header'
import SEO from '../components/seo'

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO
        article={true}
        title={post.frontmatter.title}
        description={post.frontmatter.lead}
      />
      <Main>
        <PostHeader {...post.frontmatter} />
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </Main>
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
