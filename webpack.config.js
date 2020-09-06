const path = require('path');

const productionConfig = {
  mode: 'production',
  
  entry: './lib/main.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'canvasDatagrid',
    filename: 'canvas-datagrid.js'
  },

};

const developmentConfig = {
  ...productionConfig,
  
  mode: 'development',
  devtool: 'source-map',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'canvasDatagrid',
    filename: 'canvas-datagrid.debug.js',
    sourceMapFilename: 'canvas-datagrid.debug.map'
  },
};

module.exports = [productionConfig, developmentConfig];