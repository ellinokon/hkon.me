import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import PostSnippet from '../components/post-snippet'

const Posts = ({ posts }) => posts.map(({ node }) => <PostSnippet {...node} />)

export default ({ data }) => {
  const page = data.markdownRemark
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout>
      <section>
        <h1>{page.frontmatter.title}</h1>

        <div dangerouslySetInnerHTML={{ __html: page.html }} />
      </section>

      <section>
        <h2 id="blog">Blog</h2>

        <Posts posts={posts} />
      </section>
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
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
        }
      }
    }
  }
`
