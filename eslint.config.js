import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
    { ignores: ["dist", "build"] },
    {
        settings: {
            react: {
                version: "detect"
            }
        }
    },
    js.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat["jsx-runtime"],
    reactHooks.configs.flat.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: {
            "react-refresh": reactRefresh
        },
        rules: {
            // React 19 no longer supports propTypes
            "react/prop-types": "off",
            "react-refresh/only-export-components": ["warn", { "allowConstantExport": true }]
        }
    }
];
