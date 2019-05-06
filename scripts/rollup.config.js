
const path = require('path')

const eslint = require('rollup-plugin-eslint');
const node = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel')
const replace = require('rollup-plugin-replace');
const alias = require('rollup-plugin-alias')
const flow = require('rollup-plugin-flow-no-whitespace')
const vue = require('rollup-plugin-vue')
const embedCss = require('rollup-plugin-embed-css')
const postcss  = require('rollup-plugin-postcss')
const autoprefixer  = require('autoprefixer')
const cssnano  = require('cssnano')

const version = process.env.VERSION || require('../package.json').version
const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Kerry\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = _path => path.resolve(__dirname, '../', _path)

export default {
    input: resolve('src/index.js'),
    output: [{ // browser dev
        file: resolve('dist/aife-ui.js'),
        format: 'umd',
        banner,
        name: 'AifeUI',
        env: 'development'
    },{
        file: resolve('dist/aife-ui.min.js'),
        format: 'umd',
        banner,
        name: 'AifeUI',
        env: 'production'
    },{
        file: resolve('dist/aife-ui.common.js'),
        format: 'cjs',
        banner,
        name: 'AifeUI',
    },{
        file: resolve('dist/aife-ui.esm.js'),
        format: 'es',
        banner,
        name: 'AifeUI',
    }],
    plugins: [
        flow(),
        vue(),
        node(),
        // embedCss(),
        commonjs(),
        replace({
          __VERSION__: version
        }),
        // buble({
        //   objectAssign: 'Object.assign',
        // })
        postcss({
            plugins: [autoprefixer, cssnano],
            extract: 'dist/css/bundle.css' // 输出路径
        }),
        babel({
          exclude: "node_modules/**",
          externalHelpers: true,
          runtimeHelpers: true
        })
    ],
    external: [
        'vue',
        'element-ui',
        'vue-codemirror'
    ]
}