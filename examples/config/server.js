const express = require('express')
const rewrite = require('express-urlrewrite')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackConfig = require('./webpack.dev.config')

const app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/',
  stats: {
    colors: true,
    chunks: false
  }
}))

// const fs = require('fs')
// const path = require('path')
// app.get("/", function (req, res) {
  
//   res.sendFile(path.resolve(__dirname,'../../__build__/index.html'))
// })
// fs.readdirSync(path.resolve(__dirname, "..")).forEach(file => {
//   if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
//     app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
//   }
// })
// app.use("/", express.static(__dirname + '../../__build__'))
// app.use('/__build__',express.static(path.resolve(process.cwd(), ".")))
// app.use(express.static(path.resolve(__dirname, "../../")))

const port = process.env.PORT || 8082
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
