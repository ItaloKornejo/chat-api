const messageControllers = require('./messages.controllers')

const getAllMessagesConversation = (req, res) => {
    const conversationId = req.params.conversation_id
    messageControllers.findAllMessagesConversation(conversationId)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const getMessageById = (req, res) => {
    const messageId = req.params.message_id
    messageControllers.findMessageById(messageId)
        .then((data) => {
            if(data){
                res.status(200).json(data)
            } else {
                res.status(404).json({message: 'Invalid ID'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: err.message})
        })
}

const postMessage = (req,res) => {
    const userId = req.user.id
    const conversationId = req.params.conversation_id
    const {message} = req.body
    messageControllers.createMessage({userId,conversationId,message})
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({ message: err.message,field: {
            message: 'text_'
        }})
    })
}

const deleteMessageById = (req,res) => {
    const messageId = req.params.message_id
    messageControllers.removeMessagebyId(messageId)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({ message: err.message,field: {
            message: 'text_'
        }})
    })
}



const deleteMessagesConversation = (req,res) => {
    const conversationId = req.params.conversation_id
    messageControllers.removeAllMessagesConversation(conversationId)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({ message: err.message,field: {
            message: 'text_'
        }})
    })
}




module.exports = {
    postMessage,
    deleteMessagesConversation,
    getAllMessagesConversation,
    getMessageById,
    deleteMessageById
}

