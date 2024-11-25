import tseslint from 'typescript-eslint'
import techor from 'eslint-config-techor'

export default tseslint.config(
    techor.configs.recommended
)