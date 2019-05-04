const fs = require('fs')
const path = require('path')
const VuePlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Expose __dirname to allow automatically setting basename.
  // context: path.join(__dirname, '../'),
  // node: {
  //   __dirname: true
  // },

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
    app: path.resolve(process.cwd(), 'examples/basic/index.js')
  },

  output: {
    path: path.resolve(process.cwd(), 'docs'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
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
      {
        test: /\.(png|(jpe?g)|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "static/image/[name].[hash:8].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file-loader"
      },
    ]
  },

  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm.js',
      'beaf-ui': path.resolve(process.cwd(), 'src')
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
    },
    runtimeChunk: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Also generate a index.html
      title: "beaf-ui",
      inject: true,
      filename: "index.html",
      template: path.resolve(__dirname,"../index.html.template")
    }),
    new VuePlugin()
  ]
}
