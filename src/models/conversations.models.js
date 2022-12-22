const {DataTypes} = require('sequelize');

const db = require('../utils/database');

const Users = require('./users.models');

const {removeParticipantConversations} = require('../participants/participants.controllers')
const {removeAllMessagesConversation} = require('../messages/messages.controllers')

const Conversations = db.define('conversations' ,{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len : [2, 50]
        }
    },
    userId:  {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'enable'
    }
},{
    hooks: {
        afterUpdate: (conversations) => {
          if(conversations.status==='disabled'){
            removeParticipantConversations(conversations.id)
            removeAllMessagesConversation(conversations.id)
          }
        }
      }
}
)

module.exports = Conversations