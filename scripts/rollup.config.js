
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
        file: resolve('dist/beaf-ui.js'),
        format: 'umd',
        banner,
        name: 'BeafUI',
        env: 'development'
    },{
        file: resolve('dist/beaf-ui.min.js'),
        format: 'umd',
        banner,
        name: 'BeafUI',
        env: 'production'
    },{
        file: resolve('dist/beaf-ui.common.js'),
        format: 'cjs',
        banner,
        name: 'BeafUI',
    },{
        file: resolve('dist/beaf-ui.esm.js'),
        format: 'es',
        banner,
        name: 'BeafUI',
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
// module.exports = [
//   // browser dev
//   {
//     file: resolve('dist/beaf-ui.js'),
//     format: 'umd',
//     env: 'development'
//   },
//   {
//     file: resolve('dist/beaf-ui.min.js'),
//     format: 'umd',
//     env: 'production'
//   },
//   {
//     file: resolve('dist/beaf-ui.common.js'),
//     format: 'cjs'
//   },
//   {
//     file: resolve('dist/beaf-ui.esm.js'),
//     format: 'es'
//   }
// ].map(genConfig)

// function genConfig (opts) {
//   const config = {
//     input: {
//       input: resolve('src/index.js'),
//       plugins: [
//         flow(),
//         vue(),
//         node(),
//         // embedCss(),
//         commonjs(),
//         replace({
//           __VERSION__: version
//         }),
//         // buble({
//         //   objectAssign: 'Object.assign',
//         // })
//         postcss({
//             plugins: [autoprefixer, cssnano],
//             extract: 'dist/css/bundle.css' // 输出路径
//         }),
//         babel({
//           exclude: "node_modules/**",
//           externalHelpers: true,
//           runtimeHelpers: true
//         })
//       ]
//     },
//     output: {
//       file: opts.file,
//       format: opts.format,
//       banner,
//       name: 'BeafUI'
//     },
//     external: [
//       'vue',
//       'element-ui',
//       'vue-codemirror'
//     ]
//   }

//   if (opts.env) {
//     config.input.plugins.unshift(replace({
//       'process.env.NODE_ENV': JSON.stringify(opts.env)
//     }))
//   }
  

//   return config
// }