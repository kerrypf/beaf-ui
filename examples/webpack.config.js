const fs = require('fs')
const path = require('path')
const VuePlugin = require('vue-loader/lib/plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // Expose __dirname to allow automatically setting basename.
  context: __dirname,
  node: {
    __dirname: true
  },

  mode: process.env.NODE_ENV || 'development',

  // entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
  //   const fullDir = path.join(__dirname, dir)
  //   const entry = path.join(fullDir, 'app.js')
  //   if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
  //     entries[dir] = ['es6-promise/auto', entry]
  //   }

  //   return entries
  // }, {}),

  entry: {
    app: path.join(__dirname, 'basic/index.js')
  },

  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // 将 JS 字符串生成为 style 节点
        }, {
            loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
        }, {
            loader: "sass-loader" // 将 Sass 编译成 CSS
        }]
      },
    ]
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      'beaf-ui': path.join(__dirname, '..', 'src')
    }
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
      // cacheGroups: {
      //   shared: {
      //     name: 'shared',
      //     chunks: 'initial',
      //     minChunks: 2
      //   }
      // }
    }
  },

  plugins: [
    new VuePlugin()
  ]
}
