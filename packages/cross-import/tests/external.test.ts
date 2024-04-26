import { resolve } from 'path'
import crossImport from '../src'

it('read module with third-party deps', () => {
    expect(
        crossImport(resolve(__dirname, 'fixtures/external.ts')).default
    )
        .toBeDefined()
})