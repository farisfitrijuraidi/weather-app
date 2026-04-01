import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default defineConfig([
	{ ignores: ['dist/'] },
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			globals: globals.browser,
		},
		plugins: { js },
		extends: ['js/recommended'],
	},
	eslintConfigPrettier,
]);
