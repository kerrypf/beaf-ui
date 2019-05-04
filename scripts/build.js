const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const uglify = require('uglify-js')
const rollup = require('rollup')
const configs = require('./configs')

if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

build(configs)

function build (builds) {
  let built = 0
  const total = builds.length
  const next = () => {
    buildEntry(builds[built])
    // buildEntry(builds[built]).then(() => {
    //   built++
    //   if (built < total) {
    //     next()
    //   }
    // }).catch(logError)
  }

  next()
}

async function buildEntry ({ input, output }) {
  console.log(input)
  const isProd = /min\.js$/.test(output.file)
  const bundle = await rollup.rollup(input)
  console.log(Object.keys(bundle))
  // generate code and a sourcemap
  // const data = await bundle.generate(output);
  // const code = data.output
  // if (isProd) {
  //   const minified = uglify.minify(code, {
  //     output: {
  //       preamble: output.banner,
  //       /* eslint-disable camelcase */
  //       ascii_only: true
  //       /* eslint-enable camelcase */
  //     }
  //   }).code
  //   console.log(minified)
  //   return write(output.file, minified, true)
  // } else {
  //   return write(output.file, code)
  // }

  // return rollup.rollup(input)
  //   .then(bundle => bundle.generate(output))
  //   .then(({ code }) => {
  //     if (isProd) {
  //       const minified = uglify.minify(code, {
  //         output: {
  //           preamble: output.banner,
  //           /* eslint-disable camelcase */
  //           ascii_only: true
  //           /* eslint-enable camelcase */
  //         }
  //       }).code
  //       return write(output.file, minified, true)
  //     } else {
  //       return write(output.file, code)
  //     }
  //   })
}

function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
