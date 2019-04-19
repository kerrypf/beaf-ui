import  {  sayHi } from "./hhh"
//import configs from "./configs"
const { input, output } = require('./configs')[0]

sayHi()

module.exports = Object.assign({}, input, { output })
