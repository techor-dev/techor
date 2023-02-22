import log from '@techor/log'

it('prevent outputting items with empty value', () => {
    expect(log.tree({ a: 1, b: null, c: { c1: null, c2: 1 }, d: { d1: null } }))
        .not.toContain('c1')
})