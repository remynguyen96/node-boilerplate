module.exports = {
    "parser": "babel-eslint",
    "extends": [
        "airbnb-base",
        "plugin:flowtype/recommended",
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
        "import",
        "flowtype",
    ],
    "rules": {
        "linebreak-style": 0,
        "camelcase": 0,
        "no-trailing-spaces": 0,
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
        "no-param-reassign": [2, { "props": false }],
        "no-return-assign": 2,
        "object-curly-newline": [2, {"multiline": true, "consistent": true}],

        "flowtype/boolean-style": [
            2,
            "boolean"
        ],
        "flowtype/define-flow-type": 1,
        "flowtype/delimiter-dangle": [
            2,
            "never"
        ],
        "flowtype/generic-spacing": [
            2,
            "never"
        ],
        "flowtype/no-primitive-constructor-types": 2,
        "flowtype/no-types-missing-file-annotation": 2,
        "flowtype/no-weak-types": 2,
        "flowtype/object-type-delimiter": [
            2,
            "comma"
        ],
        "flowtype/require-parameter-type": 2,
        "flowtype/require-return-type": [
            2,
            "always",
            {
                "annotateUndefined": "never"
            }
        ],
        "flowtype/require-valid-file-annotation": 2,
        "flowtype/semi": [
            2,
            "always"
        ],
        "flowtype/space-after-type-colon": [
            2,
            "always"
        ],
        "flowtype/space-before-generic-bracket": [
            2,
            "never"
        ],
        "flowtype/space-before-type-colon": [
            2,
            "never"
        ],
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]+)+Type$"
        ],
        "flowtype/union-intersection-spacing": [
            2,
            "always"
        ],
        "flowtype/use-flow-type": 1,
        "flowtype/valid-syntax": 1,
    },
    "settings": {
        "flowtype": {
            "onlyFilesWithFlowAnnotation": false
        }
    }
};
