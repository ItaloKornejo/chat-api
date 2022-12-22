const {findParticipantConversations} = require('../participants/participants.controllers')

const participantValidate = (req,res,next) => {
    const conversation_id = req.params.conversation_id
    const userId = req.user.id
    findParticipantConversations(userId,conversation_id)
    .then(data => {
        if(data){
            next()
        }else{
            res.status(400).json({message : 'You are not participant from this conversation'})
        }
    })
    .catch(err => {
        res.status(400).json({message : err.message})
    })
    
}

module.exports = participantValidate