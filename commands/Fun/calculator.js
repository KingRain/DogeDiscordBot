const Discord = require('discord.js')
const client = new Discord.Client()
const disbut = require('discord-buttons')
const { Calculator } = require('weky')
const { MessageButton } = require('discord-buttons')

module.exports = {
    name: 'calculator',

    category: 'Fun',
    description: 'get a calc with buttons',
    usage: '[args input]',
    run: async (client, message, args) => {
        await Calculator(message)
    },
}
