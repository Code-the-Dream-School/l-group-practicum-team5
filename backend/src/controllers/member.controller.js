const db = require('../config/db.postgres');
const { BadRequestError, NotFoundError } = require('../errors');

const getGroupMembers = async (req, res,next) => {
    try{
        const query = `
        SELECT *
        FROM group_members
        `;

        const result = await db.query(query)

        res.status(200).json(result.rows);
    } catch(error) {
        next(error);
    }
    
}

const leaveGroup = async (req, res) => {
    res.send('leave group')
}

const removeGroupMember = async (req, res)   => {
    res.send('remove group member')
}

module.exports = {
    getGroupMembers,
    leaveGroup,
    removeGroupMember
}