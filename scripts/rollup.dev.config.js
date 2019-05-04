const { input, output } = require('./configs')[0]
console.log(input, output)
module.exports = Object.assign({}, input, { output })
