const commitFalsely = (...messages) => {
    return messages.map((commit) => {
        if (typeof commit === 'string') {
            return {
                hash: Date.now(),
                message: commit
            }
        } else {
            return {
                hash: commit.hash,
                message: commit.message
            }
        }
    })
}

export default commitFalsely
