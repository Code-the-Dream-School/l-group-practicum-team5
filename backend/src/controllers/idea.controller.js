const db = require("../config/db.postgres")
const { BadRequestError, NotFoundError } = require("../errors")

const createIdea = async (req, res, next) => {
    
}

const getGroupIdeas = async (req, res, next) => {
    res.send("Get group ideas")
}

const getIdeaById = async (req, res, next) => {
    res.send("Get idea by ID")
}

const updateIdea = async (req, res, next) => {
    res.send("Update idea")
}

const deleteIdea = async (req, res, next) => {
    res.send("Delete idea")
}

module.exports = {
    createIdea,
    getGroupIdeas,
    getIdeaById,
    updateIdea,
    deleteIdea
}
