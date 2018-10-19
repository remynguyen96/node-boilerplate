module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb-base",
  ],
  "env": {
    "browser": true,
    "node": true,
    "shared-node-browser": true,
    "jest": true,
    "es6": true,
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
  },
  "plugins": [
    "babel",
    "import"
  ],
  "rules": {
    "linebreak-style": 0,
    "camelcase": 0,
    "no-trailing-spaces": 0,
    "no-plusplus": 0,
    "arrow-parens": [
      "error",
      "always",
    ],
    "arrow-body-style": [
      2,
      "as-needed",
    ],
    "comma-dangle": [
      2,
      "always-multiline",
    ],
    "import/imports-first": 0,
    "import/newline-after-import": 0,
    "import/no-dynamic-require": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-named-as-default": 0,
    "import/prefer-default-export": 0,
    "import/no-unresolved": 0,
    "indent": [
      0,
      0,
      {
        "SwitchCase": 1,
      },
    ],
    "max-len": 0,
    "no-console": 1,
    "no-param-reassign": [2, {
      "props": false
    }],
    "no-return-assign": 2,
    "object-curly-newline": [2, {
      "multiline": true,
      "consistent": true
    }],
  }
};
