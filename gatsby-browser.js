require('./src/styles/font-inter.css')
require('./src/styles/global.css')
require('prismjs/themes/prism-solarizedlight.css')

exports.onRouteUpdate = () => {
  // eslint-disable-next-line no-undef
  if (typeof fathom === 'function') {
    // eslint-disable-next-line  no-undef
    fathom('trackPageview')
  }
}
