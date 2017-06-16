const metalsmith = require('metalsmith')
const collections = require('metalsmith-collections')
const drafts = require('metalsmith-drafts')
const handlebars = require('handlebars')
const layouts = require('metalsmith-layouts')
const markdownit = require('metalsmith-markdownit')
const permalinks = require('metalsmith-permalinks')
const sitemap = require('metalsmith-mapsite')

const metadata = require('./metadata')

handlebars.registerHelper('moment', require('helper-moment'));

/**
 * Build static website
 */
metalsmith(__dirname)
  .metadata(metadata)
  .source('src/content')
  .destination('.build')
  .clean(true)
  .use(drafts())
  .use(collections({
    blog: 'blog/*.md'
  }))
  .use(markdownit({
    html: true,
    typographer: true
  }))
  .use(permalinks({
    relative: false
  }))
  .use(layouts({
    engine: 'handlebars',
    directory: 'src/templates',
    partials: 'src/templates/partials',
    pattern: '**/*.html',
    default: 'page.html',
  }))
  .use(sitemap('https://hkon.me'))
  .build((err) => {
    if (err) {
      throw err
    } else {
      console.log('Build completed.')
    }
  })
