import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import Container from '../container'
import Footer from './footer'
import Header from './header'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Container>
        <Header siteTitle={data.site.siteMetadata.title} />
        {children}
        <Footer />
      </Container>
    )}
  />
)

export default Layout
