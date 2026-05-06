
const getGroupMembers = async (req, res) => {
    res.send('get group members')
}

const leaveGroup = async (req, res) => {
    res.send('leave group')
}

const removeGroupMember = async (req, res) => {
    res.send('remove group member')
}

module.exports = {
    getGroupMembers,
    leaveGroup,
    removeGroupMember
}