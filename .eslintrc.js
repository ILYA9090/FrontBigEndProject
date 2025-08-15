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
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'react-hooks',
    'ilya-ov-plugin',
  ],
  rules: {
    'react/prop-types': 'off',
    'function-paren-newline': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'implicit-arrow-linebreak': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens',
        assignment: 'parens',
        return: 'parens',
        arrow: 'parens',
        condition: 'parens',
        logical: 'parens',
        prop: 'ignore', // ← Отключаем проверку для пропсов
      },
    ],
    'operator-linebreak': 'off',
    'no-unexpected-multiline': 'off',
    'comma-dangle': 'off',
    'no-undef': 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'react/no-array-index-key': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    // Правило для запрета литеральных строк
    'i18next/no-literal-string': [
      'warn', // Уровень ошибки
      {
        markupOnly: true, // Проверять только JSX-разметку
        ignoreAttribute: [
          // Атрибуты, которые можно оставить без перевода
          'data-testid', // ID для тестов
          'direction',
          'target',
          'as',
          'role',
          'border',
          'gap',
          'justify',
          'align',
          'to', // пропуст to
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
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'ilya-ov-plugin/path-checker': 'warn',
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  // Исключения для определенных файлов
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off', // Отключаем правило для этих файлов
        'max-len': 'off',
        indent: [
          'error',
          2,
          {
            ignoredNodes: ['TemplateLiteral', 'JSXElement *', 'JSXElement'],
            SwitchCase: 1,
          },
        ],
      },
    },
  ],
};
