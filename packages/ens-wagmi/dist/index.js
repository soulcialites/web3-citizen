
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ens-wagmi.cjs.production.min.js')
} else {
  module.exports = require('./ens-wagmi.cjs.development.js')
}
