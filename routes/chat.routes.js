const router = require("express").Router()
const Message = require("../models/Message.model")
const Groups = require("../models/Groups.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post('/message/:groupid', isAuthenticated, async (req, res, next) =>{
    const userid = req.payload._id
    const {groupid} = req.params 
    const {content} = req.body
    try {
        const newMessage = await Message.create({sender: userid, content})
        await Groups.findByIdAndUpdate(groupid, {$push:{chat: newMessage._id}})
        res.status(201).json(newMessage)
    } catch (error) {
        next(error)
        
        
    }
}
) 










module.exports = router