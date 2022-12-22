const Users = require('./users.models');
const RecoveryPasswords = require('./recoveryPasswords.models');
const Conversations = require('./conversations.models');
const Participants = require('./participants.models');
const Messages = require('./messages.models');

const initModels = () => {

    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords);
    RecoveryPasswords.belongsTo(Users);
    
    // Users 1 : M Converstations
    Users.hasMany(Conversations);
    Conversations.belongsTo(Users);

    // Users 1 : M Messages
    Users.hasMany(Messages);
    Messages.belongsTo(Users);
    
    // Conversations 1 : M Messages
    Conversations.hasMany(Messages);
    Messages.belongsTo(Conversations);

    // Users 1 : M Participants Pivot
    Users.hasMany(Participants);
    Participants.belongsTo(Users);

    // Conversations 1 : M Participants Pivot
    Conversations.hasMany(Participants);
    Participants.belongsTo(Conversations);
}

module.exports = initModels