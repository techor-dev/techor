import log from './src'

log(new Error('Foo'))

log`${[1, 2, 3]}`
log`-> prettier arrow`
log`<- prettier arrow`
log`**highlight**`
log`*italic*`
log`~~strikethrough~~`
log`__underline__`
log`!!warning!!`
log`..silence..`
log`up +1+`
log`down -1-`
log`(normal)`
log`[normal]`
log`<normal>`
log`npx create-next-app <project>`
log`5:24:11 AM test`
log`dist/index.cjs.map 15.5KB`
log`$t show timestamp`

log.add`add +3+ files`
log.del`delete -3- files`
log.conflict`Custom elements cannot be defined again`
log.fail`too many requests`
log.info`build in 3ms`

console.log('')
log.i`change File change detected. Starting incremental compilation...`
log.i`File change detected. Starting incremental compilation...`
log.i`esm ${4} entries`
log.i`cjs ${4} entries`
log.i`iife ${4} entries`
log.i`entries`

console.log('')
log.error`Type Cannot use import statement outside a module`

console.log('')
log.conflict`Version Custom elements cannot be defined again`

console.log('')
log.pass`Test ${3} cases`

console.log('')
log.ok`Up to date, audited *1076* packages in .786ms.`

console.log('')
log.del`Delete -3- files`
log.add`Add +3+ files`

console.log('')
log.o`Valid commit format "Fix(Compiler): Import user config file path problem"`
log.x`Invalid commit format .Aron Conventional Commits.`

console.log('')
log.success`All files exported to desktop ${3}`
log.warn`Warn Same file name`
log.fail`Too many requests`

console.log('')
log`${[1, 2, 3, 'fg:blue', 'text:center', 'italic', true, false]}`
log`[compile] test 3 items \`bg:red\` test ${'omg'} fwe [few] fuck20ms 20ms`
log`[compile] +${10}+ valid inserted ..in.. ${20}ms ${['block', 'static']}`