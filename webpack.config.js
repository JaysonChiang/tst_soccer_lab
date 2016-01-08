var path = require('path');
var webpack = require('webpack');
 
module.exports = {
  entry: {
    term:'./MainAppTerm.js',
    time:'./MainAppTime.js',
    timeCookie:'./MainAppTimeCookie.js',
    termCookie:'./MainAppTermCookie.js',
    setTeam:'./AppSetTeam.js'},
  output: { path: __dirname, filename: 'bundle-[name].js' },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};