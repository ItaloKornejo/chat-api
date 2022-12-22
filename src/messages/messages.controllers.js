const Messages = require('../models/messages.models')
const uuid = require('uuid')

const findAllMessagesConversation = async(conversationId) => {
    const data = await Messages.findAll({where :{
        conversationId: conversationId,
        status: 'enable'
        }  
    })
    return data
}

const findMessageById = async(messageId) => {
    const data = await Messages.findOne({where :{
        id: messageId,
        status: 'enable'
        }  
    })
    return data
}

const createMessage = async(obj) => {
    console.log("INSIDE MESSAGE: ",obj);
    const data = await Messages.create({
        id: uuid.v4(),
        message: obj.message,
        userId: obj.userId,
        conversationId: obj.conversationId
    })
    return data
}

const removeMessagebyId = async(messageId) => {
    const data = await Messages.update({status:'disabled'}, {
        where:{
        id: messageId,
        status: 'enable'
        }   
    })
    return data
}



const removeAllMessagesConversation = async(conversationId) => {
    const data = await Messages.update({status:'disabled'}, {
        where:{
        conversationId: conversationId
        }   
    })
    return data
}

module.exports = {
    createMessage,
    removeAllMessagesConversation,
    findAllMessagesConversation,
    findMessageById,
    removeMessagebyId
}