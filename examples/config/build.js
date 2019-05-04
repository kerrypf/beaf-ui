const config = require('./webpack.prod.config');

const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path')

console.log('building for production...')

if (!fs.existsSync('docs')) {
    fs.mkdirSync('docs')
}
fs.emptyDirSync(path.resolve(process.cwd(), "docs"))
webpack(config, function (err, stats) {
    
    if (err) {
        throw err
    }
    console.log(chalk.green('Compiled successfully.\n'));
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n')
})