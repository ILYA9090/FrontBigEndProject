import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;

  const svgLoaders = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };
  const codeBableLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBableLoader = buildBabelLoader({ ...options, isTsx: true });

  const cssLoaders = buildCssLoader(isDev);

  // const typeScriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // };

  const fileLoader = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  };

  return [
    fileLoader,
    svgLoaders,
    codeBableLoader,
    tsxCodeBableLoader,
    cssLoaders,
  ];
}
