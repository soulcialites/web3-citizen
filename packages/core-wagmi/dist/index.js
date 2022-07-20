
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./core-wagmi.cjs.production.min.js')
} else {
  module.exports = require('./core-wagmi.cjs.development.js')
}
