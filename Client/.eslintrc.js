module.exports = {
    "parser": "babel-eslint",
    "env": {
        "es6": true,
    },
    "plugins": [
    ],
    "extends": [
        "eslint:recommended",
        "airbnb",
    ],
    "rules": {
        "no-console": ["error", { allow: ["warn", "error"] }],
        "indent": ["error", 4],
        "prefer-template": 0,
        "radix": 0,
        "class-methods-use-this": 0,
        "react/prop-types": 0,
        "new-cap": 0,
        "no-else-return": 0,
        "arrow-parens": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/jsx-filename-extension": 0,
        "react/jsx-boolean-value": 0,
        "global-require": 0,
        "arrow-body-style": 0,
        "max-len": 0,
        "react/jsx-closing-bracket-location": 0,
        "no-return-assign": 0,
        "guard-for-in": 0,
        "react/forbid-prop-types": 0,
        "quotes": 0,
        "no-underscore-dangle": 0,
        "no-restricted-syntax": 0,
        'no-nested-ternary': 0,
        // overrides
    },
    "globals": {
      "require": true,
      "navigationOptions": true,
      "propTypes": true,
      "fetch": true,
      "defaultProps": true,
    }
  }
