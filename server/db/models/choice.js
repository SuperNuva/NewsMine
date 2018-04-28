const Sequelize = require('sequelize')
const db = require('../db')

const Choice = db.define('choice', {
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },

    categories: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    },

    keywords: {
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
})

module.exports = Choice