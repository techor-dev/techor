/** @type {import('eslint').Linter.Config} */
module.exports = {
    ignores: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/coverage/**',
        '**/.git/**',
        '**/.next/**',
        '**/.nuxt/**',
        '**/public/**',
        '.env*',
        'yarn.lock',
        'package-lock.json',
        '**/*.log',
        '**/*.d.ts',
        '**/*.min.js',
    ]
}