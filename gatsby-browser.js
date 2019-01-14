import './src/styles/global.css'

export const onRouteUpdate = () => {
  if (typeof fathom === 'function') { // eslint-disable-line no-undef
    fathom('trackPageview') // eslint-disable-line no-undef
  }
}
