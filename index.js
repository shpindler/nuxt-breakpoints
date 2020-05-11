/* eslint-disable */
const path = require('path')

export default function (moduleOptions) {
  this.nuxt.hook('modules:done', () => {
    this.addPlugin(path.resolve(__dirname, 'plugin.js'))
  })
}
