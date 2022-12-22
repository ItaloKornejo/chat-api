const Participants = require('../models/participants.models');

const findParticipantConversations = async (userId,conversationId)=>{
    const data = await Participants.findOne({
        where: {
            userId:userId,
            conversationId: conversationId
        }
    })
    return data
}

const removeParticipantConversations = async (conversationId)=>{
    const data = await Participants.update({status:'disabled'},{
        where: {
            conversationId: conversationId
        }
    })
    return data
}

module.exports = {findParticipantConversations,removeParticipantConversations}