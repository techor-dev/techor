const dedent = require('dedent')

module.exports = /* html */ dedent`
{{#if noteGroups}}
{{#each noteGroups}}
### {{title}}
{{#each notes}}
* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}
{{/each}}
{{/each}}
{{/if}}
`