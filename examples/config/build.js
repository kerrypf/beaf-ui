const config = require('./webpack.prod.config');

const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs-extra');

console.log('building for production...')

fs.emptyDirSync(path.resolve(process.cwd(), "docs")));
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