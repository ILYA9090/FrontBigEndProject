import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };

  // Создаем новый объект конфигурации
  const newConfig: webpack.Configuration = {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [...(config.resolve?.modules || []), paths.src],
      extensions: [...(config.resolve?.extensions || []), '.ts', '.tsx'],
    },
    module: {
      ...config.module,
      rules: [
        ...(config.module?.rules
          ?.filter((rule): rule is RuleSetRule => !!rule && typeof rule === 'object' && 'test' in rule)
          ?.map((rule) => {
            if (/svg/.test(rule.test as string)) {
              return { ...rule, exclude: /\.svg$/i };
            }
            return rule;
          }) || []),
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        buildCssLoader(true),
      ],
    },
  };

  return newConfig;
};
