export default {
    headerPattern: /^([A-Z]\w*)(?:\(([0-9A-Z`_#~].*)\))?: ([0-9A-Z`_#~].*)$/,
    headerCorrespondence: [
        'type',
        'scope',
        'subject'
    ],
    revertPattern: /^(?:Revert|Revert:)\s"?([\s\S]+?)"?\s*This reverts commit (\w*)\./i,
    revertCorrespondence: ['header', 'hash']
}