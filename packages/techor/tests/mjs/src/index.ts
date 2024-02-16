import { AAA, BBB } from './components'
import 'server-only/default.js'

export * from './components'
export const components = [
    AAA,
    BBB
]

const a = [...new Set([1, 2, 3])]
// eslint-disable-next-line quotes
const b = "import { AAA, BBB } from './components'"

console.log(a)