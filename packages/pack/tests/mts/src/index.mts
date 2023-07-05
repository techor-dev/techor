import { AAA, BBB } from './components/index.mjs'

export * from './components/index.mjs'
export const components = [
    AAA,
    BBB
]

const a = [...new Set([1, 2, 3])]

console.log(a)