import line from './src'

test('Strings', () => {
    expect(line`a ${true && 'b'} c`).toBe('a b c')
})

test('Objects', () => {
    expect(line`a ${{ b: true, c: false, d: true }} e`).toBe('a b d e')
})

test('Arrays', () => {
    expect(line`a ${['b', 0, false, 'c']} d`).toBe('a b c d')
})

test('Resolve types', () => {
    expect(line`a ${true} ${false} ${''} ${null} ${undefined} ${0} ${NaN} b`)
        .toBe('a b')
})

test('Trim and clear', () => {
    expect(line`
    a
    b
    ${undefined}
    c    d
`).toBe('a b c d')
})

test('Mixed and nested', () => {
    expect(line`
    a
    ${[
            1 && 'b',
            { c: false, d: null },
            ['e', ['f']]
        ]
        }
    g    h
`).toBe('a b e f g h')
})

test('Execute like a function', () => {
    expect(line`a b ${['c', 'd']} ${{ e: true, f: false }} ${true && 'g'}`).toBe('a b c d e g')
    expect(line('a b', ['c', 'd'], { e: true, f: false }, true && 'g')).toBe('a b c d e g')
})