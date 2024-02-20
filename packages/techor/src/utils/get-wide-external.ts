export default function getWideExternal(depNames: string[]) {
    return depNames
        .map((eachDepName) => new RegExp(`^${eachDepName}(?:/.+)?$`))
}