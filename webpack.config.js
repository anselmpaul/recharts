const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const env = process.env.NODE_ENV;

const config = {
  entry: './src/index.ts',

  output: {
    filename: `Recharts${env === 'production' ? '.min' : ''}.js`,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, '/node_modules/d3-scale'),
          path.resolve(__dirname, '/node_modules/d3-array'),
          path.resolve(__dirname, '/node_modules/d3-format'),
          path.resolve(__dirname, '/node_modules/d3-time-format'),
          path.resolve(__dirname, '/node_modules/d3-time'),
          path.resolve(__dirname, '/node_modules/d3-shape'),
          path.resolve(__dirname, '/node_modules/d3-color'),
          path.resolve(__dirname, '/node_modules/d3-interpolate'),
          path.resolve(__dirname, '/node_modules/d3-path'),
        ],
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['lodash'],
          },
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: {
          loader: 'ts-loader',
        }
      }
    ],
  },

  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },

  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
};

if (env === 'analyse') {
  config.plugins.push(
    new BundleAnalyzerPlugin()
  );
}

if (env === 'development') {
  config.mode = 'development';
  config.devtool = 'source-map';
}

if (env === 'production') {
  config.mode = 'production';
}

module.exports = config;
