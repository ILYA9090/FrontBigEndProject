import webpack, { RuleSetRule, DefinePlugin } from 'webpack'; // Добавлен импорт DefinePlugin
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
      modules: [path.resolve(__dirname, '../../src'), 'node_modules', ...(config.resolve?.modules || [])],
      extensions: [...(config.resolve?.extensions || []), '.ts', '.tsx'],
      alias: {
        ...config.resolve?.alias,
        '@': paths.src,
      },
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
    plugins: [
      ...(config.plugins || []),
      new DefinePlugin({
        __IS_DEV__: JSON.stringify(true), // Добавлен DefinePlugin с глобальной переменной
      }),
    ],
  };

  return newConfig;
};
