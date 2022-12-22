const {DataTypes} = require('sequelize')
const Users = require('./users.models')
const Conversations = require('./conversations.models')
const db = require('../utils/database')

const Messages = db.define('messages',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    userId : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Users
            
        }
    },
    conversationId : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            key: 'id',
            model: Conversations
            
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'enable'
    }
})

module.exports = Messages