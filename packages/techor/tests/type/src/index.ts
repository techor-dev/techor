export default class Person {
    constructor(
        name: string,
        age: number
    ) { }
    sex: string
    weight: number
    height: number
}

export { Foo } from './foo'
export const person = new Person('John', 18)