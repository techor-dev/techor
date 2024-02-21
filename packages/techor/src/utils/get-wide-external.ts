import { ExternalOption } from 'rollup'

export default function getWideExternal(depNames: ExternalOption) {
    return (Array.isArray(depNames) ? depNames : [depNames])
        .map((eachDepName) => {
            if (eachDepName instanceof RegExp) return eachDepName
            return new RegExp(`^${eachDepName}(?:/.+)?$`)
        })
}