import path from "path";
import node from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import buble from "rollup-plugin-buble"
import replace from "rollup-plugin-replace"
import flow from "rollup-plugin-flow-no-whitespace"
import vue from "rollup-plugin-vue"
import embedCss from "rollup-plugin-embed-css"

const version = process.env.VERSION || require('../package.json').version
const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Kerry\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = _path => path.resolve(__dirname, '../', _path)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('src/index.js'),
      plugins: [
        flow(),
        vue(),
        node(),
        embedCss(),
        commonjs(),
        replace({
          __VERSION__: version
        }),
        buble({
          objectAssign: 'Object.assign',
        })
        // babel({
        //   exclude: "node_modules/**",
        //   externalHelpers: true,
        //   runtimeHelpers: true
        // }),
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'BeafUI'
    },
    external: [
      'vue'
    ]
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }


  return config
}

export const umdDev = genConfig({
  file: resolve('dist/beaf-ui.js'),
  format: 'umd',
  env: 'development'
});

export const umdProd = genConfig(
  {
    file: resolve('dist/beaf-ui.min.js'),
    format: 'umd',
    env: 'production'
  })

export const cjs = genConfig({
  file: resolve('dist/beaf-ui.common.js'),
  format: 'cjs'
})

export const es = genConfig({
  file: resolve('dist/beaf-ui.esm.js'),
  format: 'es'
})


