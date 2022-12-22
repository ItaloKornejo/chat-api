const {DataTypes} = require('sequelize')
const Users = require('./users.models')
const Conversations = require('./conversations.models')
const db = require('../utils/database')

const Participants = db.define('participants',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userId : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    conversationId : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Conversations,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'enable'
    }
})

module.exports = Participants