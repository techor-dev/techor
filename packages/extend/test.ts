import extend from './src'

it('overview', () => {
    expect(
        extend(
            {
                a: 1,
                b: 2,
                d: {
                    a: 1,
                    b: [],
                    c: { test1: 123, test2: 321 }
                },
                f: 5,
                g: 123,
                i: 321,
                j: [1, 2]
            },
            {
                b: 3,
                c: 5,
                d: {
                    b: { first: 'one', second: 'two' },
                    c: { test2: 222 }
                },
                e: { one: 1, two: 2 },
                f: [],
                g: (void 0),
                h: /abc/g,
                i: null,
                j: [3, 4]
            }
        )
    )
        .toEqual({
            a: 1,
            b: 3,
            d:
            {
                a: 1,
                b: { first: 'one', second: 'two' },
                c: { test1: 123, test2: 222 }
            },
            f: [],
            g: undefined,
            c: 5,
            e: { one: 1, two: 2 },
            h: /abc/g,
            i: null,
            j: [3, 4]
        })
})

it('deeply extend', () => {
    expect(
        extend(
            {
                a: 1,
                b: 2,
                c: {
                    d: [1, 2],
                    i: { ii: 2, iii: 3, iiii: 4 },
                    e: 4,
                    k: undefined,
                    z: [0, 5],
                    g: { a: 1 }
                }
            },
            {
                c: {
                    d: { first: 'one', second: 'two' },
                    i: { ii: [4, 5], iiii: { j: 1, jj: 2 } },
                    f: 5,
                    z: [10, 20],
                    k: 30,
                    g: null
                }
            }
        )
    )
        .toEqual(
            {
                a: 1,
                b: 2,
                c: {
                    d: { first: 'one', second: 'two' },
                    i: { ii: [4, 5], iii: 3, iiii: { j: 1, jj: 2 } },
                    e: 4,
                    f: 5,
                    k: 30,
                    z: [10, 20],
                    g: null
                }
            }
        )
})

it('skip non-plain obj source', function () {
    expect(extend(undefined, { a: 1 }, null, { b: 2 }, 0, { c: 3 }, false, true)).toEqual({
        a: 1, b: 2, c: 3
    })
})

it('should ignore undefined', function () {
    const a = { hello: 1 }
    const b = undefined
    extend(a, b)
    expect(a).toEqual({
        hello: 1
    })
})

it('should ignore null', function () {
    const a = { hello: 1 }
    const b = null
    extend(a, b)
    expect(a).toEqual({
        hello: 1
    })
})

it('can extend on 1 level', function () {
    expect(extend(
        { hello: 1 },
        { world: 2 }
    )).toEqual(
        { hello: 1, world: 2 }
    )
})

it('can extend on 2 levels', function () {
    expect(extend(
        { person: { name: 'John' } },
        { person: { age: 30 } })
    ).toEqual({
        person: { name: 'John', age: 30 }
    })
})

it('can extend and overrided by non-plain object', function () {
    const a = { hello: 1, value: {} }
    const b = { value: Buffer.from('world') }
    const result: any = extend(a, b)
    expect(result).toEqual({
        hello: 1,
        value: Buffer.from('world')
    })
    expect(b.value !== result.value).toBeTruthy()
})

it('doesn\'t change sources', function () {
    const a = { a: [1] }
    const b = { a: [2] }
    const c = { c: 3 }
    const d = extend({}, a, b, c)

    expect(a).toEqual({ a: [1] })
    expect(b).toEqual({ a: [2] })
    expect(c).toEqual({ c: 3 })
})

it('example from README.md', function () {
    const obj1 = {
        a: 1,
        b: 2,
        d: {
            a: 1,
            b: [1, 2],
            c: { test1: 123, test2: 321 }
        },
        f: 5,
        g: 123,
        i: 321,
        j: [1, 2]
    }

    const obj2 = {
        b: 3,
        c: 5,
        d: {
            b: { first: 'one', second: 'two' },
            c: { test2: 222 }
        },
        e: { one: 1, two: 2 },
        f: [],
        g: (void 0),
        h: /abc/g,
        i: null,
        j: [3, 4]
    }

    const result = extend(obj1, obj2)

    expect(result).toEqual({
        a: 1,
        b: 3,
        d: {
            a: 1,
            b: { first: 'one', second: 'two' },
            c: { test1: 123, test2: 222 }
        },
        f: [],
        g: undefined,
        c: 5,
        e: { one: 1, two: 2 },
        h: /abc/g,
        i: null,
        j: [3, 4]
    })

    expect(('g' in result)).toBeTruthy()
    expect(('x' in result)).toBeFalsy()
})

it('clone arrays instead of extend', function () {
    expect(extend({ a: [1, 2, 3] }, { a: [2, 3] })).toEqual({ a: [2, 3] })
})

test('semantic-release-config-aron', () => {
    expect(
        extend({
            '@semantic-release/commit-analyzer': { preset: 'aron' },
            '@semantic-release/release-notes-generator': { preset: 'aron' },
            '@semantic-release/exec': {
                prepareCmd: 'pnpm run check && pnpm run build',
                publishCmd: 'aron version ${nextRelease.version} && npm publish --workspaces --access public'
            },
            '@semantic-release/github': true
        }, {
            '@semantic-release/github': {
                assets: [
                    {
                        path: 'packages/css/dist/index.browser.js',
                        name: 'master-css.js',
                        label: 'master-css.js'
                    },
                ]
            }
        })).toEqual({
            '@semantic-release/commit-analyzer': { preset: 'aron' },
            '@semantic-release/release-notes-generator': { preset: 'aron' },
            '@semantic-release/exec': {
                prepareCmd: 'pnpm run check && pnpm run build',
                publishCmd: 'aron version ${nextRelease.version} && npm publish --workspaces --access public'
            },
            '@semantic-release/github': {
                assets: [
                    {
                        path: 'packages/css/dist/index.browser.js',
                        name: 'master-css.js',
                        label: 'master-css.js'
                    },
                ]
            }
        })
})

it('prevent source contamination', () => {
    const source = {
        1: {
            2: {
                3: true
            }
        }
    }

    extend(source, {
        1: {
            4: true
        }
    })

    expect(source).toEqual({
        1: {
            2: {
                3: true
            }
        }
    })
})