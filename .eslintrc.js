module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:i18next/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    'max-len': 'off',
    'object-curly-newline': 'off',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    // Правило для запрета литеральных строк
    'i18next/no-literal-string': [
      'error', // Уровень ошибки
      {
        markupOnly: true, // Проверять только JSX-разметку
        ignoreAttribute: [
          // Атрибуты, которые можно оставить без перевода
          'data-testid', // ID для тестов
          'aria-label', // Доступность
          'alt', // Альтернативный текст
          'role', // Роли ARIA
          'placeholder', // Плейсхолдеры
          'title', // Тултипы
          'htmlFor', // Связь label с input
          'name', // Имена полей форм
        ],
      },
    ],
  },
  globals: {
    __IS_DEV__: true,
  },
  // Исключения для определенных файлов
  overrides: [
    {
      files: [
        '**/*.test.{ts,tsx}', // Тесты
        '**/*.stories.{ts,tsx}', // Storybook
        '**/setupTests.ts', // Настройка тестов
      ],
      rules: {
        'i18next/no-literal-string': 'off', // Отключаем правило для этих файлов
      },
    },
  ],
};
