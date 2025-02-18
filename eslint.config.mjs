// // @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        files: ["js/*.ts*"],
        rules: {
            // Note: you must disable the base rule as it can report incorrect errors
            "no-unused-vars": "off",
            //"@typescript-eslint/no-unused-vars": "off"
            //"no-unused-vars": "off",
            //"@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "jsx" }],
            //"no-unused-vars": "off",
            //"@typescript-eslint/no-unused-vars": "warn"

        }
    }
)
