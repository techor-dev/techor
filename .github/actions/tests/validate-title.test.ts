const validateTitle = require('../src/validate-title')

it('detects valid PR titles', async () => {
    const inputs = [
        'Fix: Fix bug',
        'Fix: Fix bug\n\nBREAKING CHANGE: Fix bug',
        'Feat: Add feature',
        'Feat: Add feature\n\nBREAKING CHANGE: Add feature',
        'Refactor: Internal cleanup',
        'Feat: Add feature with breaking change'
    ]

    for (let index = 0; index < inputs.length; index++) {
        const input = inputs[index]
        await validateTitle(input)
    }
})

it('throws for PR titles with an unknown type', async () => {
    await expect(validateTitle('Foo: Bar')).rejects.toThrow(
        /Unknown release type "Foo" found in pull request title "Foo: Bar"./
    )
})
