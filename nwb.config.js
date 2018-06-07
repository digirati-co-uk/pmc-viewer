const sassDefine = require('sass-define');
const MetalsmithPlugin = require('@fesk/plugin-metalsmith');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: false,
    cjs: process.env.NODE_ENV === 'production',
    umd:
      process.env.NODE_ENV === 'production'
        ? {
            global: 'CanvasPanel$$PMCViewerElement',
          }
        : false,
  },
  webpack: {
    rules: {
      sass: {
        data: sassDefine(require('./sassConfig')),
      },
      babel: {
        exclude: {
          test: path.resolve(__dirname, 'node_modules'),
          exclude: [
            path.resolve(__dirname, 'node_modules/@fesk'),
            path.resolve(__dirname, 'node_modules/foundation-sites'),
          ],
        },
      },
    },
    publicPath: '',
    extra: {
      plugins:
        process.env.NODE_ENV === 'production'
          ? []
          : [
              new MetalsmithPlugin({ config: 'micro-site' }),
              new ManifestPlugin({
                filter: ({ path: p }) => p.endsWith('.map') === false,
              }),
            ],
    },
  },
  babel: {
    presets: ['react'],
    env: {
      targets: {
        browsers: ['last 2 versions', 'ie 9', 'ie 10', 'ie 11'],
      },
    },
  },
};
