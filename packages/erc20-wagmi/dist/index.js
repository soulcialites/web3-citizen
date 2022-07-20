
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./erc20-wagmi.cjs.production.min.js')
} else {
  module.exports = require('./erc20-wagmi.cjs.development.js')
}
