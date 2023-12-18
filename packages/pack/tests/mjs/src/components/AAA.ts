import { aUtil } from '../utils/a-util'

const hasFn = typeof Function !== 'undefined'

export class AAA extends (hasFn ? Function : Object) {
    _fullAAAMembership = 1
    constructor() {
        super()
        console.log(this._fullAAAMembership, aUtil())
    }
}