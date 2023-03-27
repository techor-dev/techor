import '@master/css'
// import '@master/css.webpack' // TODO(CI): src/index.ts:2:7: ERROR: Could not resolve "@master/css.webpack"
import '@master/style-element.react'

(async () => {
    // @ts-ignore
    await import('fake-external-package')
})()