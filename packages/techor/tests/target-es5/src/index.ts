function getUserName(name?: string | null) {
    const displayName = name ?? 'Guest'
    return `Hello, ${displayName}!`
}

console.log(getUserName('JoyHe'))
console.log(getUserName())