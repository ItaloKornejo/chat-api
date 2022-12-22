const router = require ('express').Router();
const conversationServices = require ('./conversations.services');
const messagesServices = require('../messages/messages.services');
const passportJWT = require ('../middlewares/auth.middleware');
const participantValidate = require('../middlewares/participantValidate.middleware');

router.route('/')
    .get(passportJWT.authenticate('jwt',{session:false}),conversationServices.getAllConversations)
    .post(passportJWT.authenticate('jwt',{session:false}),conversationServices.postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt',{session:false}),conversationServices.getConversationById)
    .patch(passportJWT.authenticate('jwt',{session:false}),conversationServices.patchConversation)
    .delete(passportJWT.authenticate('jwt',{session:false}),conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.getAllMessagesConversation)
    .post(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.postMessage)
    .delete(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.deleteMessagesConversation)
router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.getMessageById)
    .delete(passportJWT.authenticate('jwt',{session:false}),participantValidate,messagesServices.deleteMessageById)

module.exports = router