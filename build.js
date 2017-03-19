var metalsmith = require('metalsmith')
var collections = require('metalsmith-collections')
var drafts = require('metalsmith-drafts')
var handlebars = require('handlebars')
var layouts = require('metalsmith-layouts')
var markdownit = require('metalsmith-markdownit')
var permalinks = require('metalsmith-permalinks')
var sitemap = require('metalsmith-mapsite')

handlebars.registerHelper('moment', require('helper-moment'));

metalsmith(__dirname)
  .metadata({
    site: {
      name: 'Håkon Ellingsen',
      description: 'hkon.me is the personal website of Håkon Ellingsen.'
    }
  })
  .source('./src/content')
  .destination('./build')
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
    directory: './src/templates',
    partials: './src/templates/partials',
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
