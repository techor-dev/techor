export default class Person {
    constructor(
        public readonly name: string,
        public readonly age: number,
    ) { }
    sex: string
    weight: number
    height: number
}

const person = new Person('John', 18)