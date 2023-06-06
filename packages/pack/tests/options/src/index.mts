import { AAA, BBB } from './components'

export * from './components'
export const components = [
    AAA,
    BBB
]

const a = [...new Set([1, 2, 3])]

console.log(a)