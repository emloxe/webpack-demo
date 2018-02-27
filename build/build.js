'use strict'

const express = require('express');

const webpack = require('webpack');
const chalk = require('chalk');
const webpackConfig = require('./webpack.prod.config')

const compiler = webpack(webpackConfig)

compiler.watch({
 // watch options 
}, (err, stats) => {

  /* ...处理结果 */

  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')


  if (stats.hasErrors()) {
    console.log(chalk.bgRed('  ~_~ ~_~ Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.bgCyan('  Build complete.\n'))


});


var app = express();
app.use(express.static('dist'));
app.listen(3000, () => {
  console.log(chalk.bgCyan('\n \n app running, listening at http://localhost:3000'));
})



