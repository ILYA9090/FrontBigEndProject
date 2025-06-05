import { BuildOptions } from "./types/config";

import { buildLoaders } from "./buildLoaders";
import  path from 'path';
import  webpack from 'webpack'
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

    const {mode, paths} = options;
    return {
        mode: mode,
        entry: paths.entry,
        output: {
            filename: "[name].[contenthash].js",
            path: paths.build,
            clean: true
        },
        plugins: buildPlugins(options),
          module: {
        rules: buildLoaders(),
      },
      resolve: buildResolvers(),
    }
}