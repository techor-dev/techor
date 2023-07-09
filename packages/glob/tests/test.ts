import { explorePathSync, explorePathsSync } from '../src'

it('explore a path', () => {
    expect(explorePathSync('a.json', { cwd: __dirname })).toBe('a.json')
    expect(explorePathSync('*.json', { cwd: __dirname })).toBe('a.json')
})

it('explore paths', () => {
    expect(explorePathsSync('*.json', { cwd: __dirname })).toEqual(['a.json', 'b.json', 'c.json'])
})