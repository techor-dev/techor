import aPlainObj from './src'

it('should return `true` if the object is created by the `Object` constructor.', () => {
    expect(aPlainObj(Object.create({}))).toBeTruthy()
    expect(aPlainObj(Object.create(Object.prototype))).toBeTruthy()
    expect(aPlainObj({ foo: 'bar' })).toBeTruthy()
    expect(aPlainObj({})).toBeTruthy()
    expect(aPlainObj(Object.create(null))).toBeTruthy()
})

it('should return `false` if the object is not created by the `Object` constructor.', () => {
    function Foo() { this.abc = {} }
    expect(aPlainObj(/foo/)).toBeFalsy()
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    expect(aPlainObj(function () { })).toBeFalsy()
    expect(aPlainObj(1)).toBeFalsy()
    expect(aPlainObj(['foo', 'bar'])).toBeFalsy()
    expect(aPlainObj([])).toBeFalsy()
    expect(aPlainObj(new Foo)).toBeFalsy()
    expect(aPlainObj(null)).toBeFalsy()
    expect(aPlainObj(undefined)).toBeFalsy()
})
