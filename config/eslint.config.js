import pluginCspell from "@cspell/eslint-plugin";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import pluginPrettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import pluginJestDom from "eslint-plugin-jest-dom";
import pluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginSonarJs from "eslint-plugin-sonarjs";
import pluginStorybook from "eslint-plugin-storybook";
import pluginTestingLibrary from "eslint-plugin-testing-library";
import pluginUnusedImport from "eslint-plugin-unused-imports";

/** @type { import("eslint").Linter.FlatConfig } */
export const ignorePattern = {
  ignores: ["**/dist", "**/node_modules", "**/*.config.js"],
};

/** @type { import("eslint").Linter.FlatConfig } */
export const importResolver = {
  files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  plugins: {
    import: pluginImport,
    "unused-imports": pluginUnusedImport,
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", "tsx"],
      },
      typescript: {
        project: ["**/tsconfig.json"],
      },
    },
  },

  rules: {
    ...pluginImport.configs["recommended"].rules,
    ...pluginImport.configs["typescript"].rules,

    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: false },
      },
    ],

    "unused-imports/no-unused-imports": "error",
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
export const baseRules = [ignorePattern, importResolver];

/** @type { import("eslint").Linter.FlatConfig } */
export const tsRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptEslintParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": pluginTypeScript,
    "@cspell": pluginCspell,
    sonarjs: pluginSonarJs,
  },
  rules: {
    ...pluginTypeScript.configs["eslint-recommended"].rules,
    ...pluginTypeScript.configs["recommended"].rules,
    ...pluginSonarJs.configs["recommended"].rules,
    ...pluginCspell.configs["recommended"].rules,
    ...pluginPrettier.rules,

    "object-shorthand": ["error", "always", { ignoreConstructors: false, avoidQuotes: true }],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "none",
      },
    ],
  },
};

/** @type { import("eslint").Linter.FlatConfig } */
export const reactRules = {
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    react: pluginReact,
    "react-hooks": pluginReactHooks,
    "jsx-a11y": pluginJsxA11y,
    "testing-library": pluginTestingLibrary,
    "jest-dom": pluginJestDom,
  },
  settings: {
    react: { version: "detect" },
  },
  rules: {
    ...pluginReact.configs["recommended"].rules,
    ...pluginReact.configs["jsx-runtime"].rules,
    ...pluginReactHooks.configs["recommended"].rules,
    ...pluginStorybook.configs["recommended"].rules,
    ...pluginJsxA11y.configs["recommended"].rules,
    ...pluginTestingLibrary.configs["react"].rules,
    ...pluginJestDom.configs["recommended"].rules,

    "react/prop-types": "off",
    "react/self-closing-comp": ["error", { component: true, html: true }],
    "react/jsx-curly-brace-presence": ["error", { props: "never" }],
  },
};
