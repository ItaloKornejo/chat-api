const uuid = require( 'uuid' );
const Conversations = require( '../models/conversations.models');
const Participants = require( '../models/participants.models' );
const Users = require( '../models/users.models' );

const findAllConversations = async (userId) => {
    const data = await Conversations.findAll({ 
        where:{
            userId:userId,
            status:'enable' 
        },
        include: {
            model: Participants,
            include:{
                model: Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where:{
            id:id,
            status:'enable' 
        },
        include:{
            model: Participants,
            include:{
                model: Users
            }
        }
    })
    return data
}

const createConverstaion = async (obj) => {
    console.log({obj});
    const newConverstation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imageUrl: obj.imgUrl,
        userId: obj.userId // Creador de Conversacion
    })
    console.log(newConverstation.id);
    const particiapant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.userId,
        conversationId: newConverstation.id
    })
    const particiapant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId,
        conversationId: newConverstation.id
    })
    return {
        newConverstation,
        particiapant1,
        particiapant2
    }
}

const updateConversation = async (id,obj) => {
    const data = await Conversations.update(obj,{
        where: {
            id:id
        }
    })
    return data // [] Array [1] Se edito o [0] No se edito
}

const removeConversation = async(id) => {
    const data = await Conversations.update({status:'disabled'},{
        where: {
            id:id,
            status:'enable'
        },
        individualHooks: true
    })
    return data
}

module.exports = {
    findAllConversations,
    createConverstaion,
    findConversationById,
    updateConversation,
    removeConversation
}