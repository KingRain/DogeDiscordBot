const Discord = require('discord.js')
const Meme = require('memer-api')
const mySecret = process.env['TOKEN']
const { prefix, api_token } = require('./botconfig/config.json')
const colors = require('colors')
const Enmap = require('enmap')
const canvacord = require('canvacord')
const mongoose = require('mongoose')
const economy = require('@shinchanop/mongo-eco')
const mongoDB = process.env['MONGODB']
const date = new Date()
const ms = require('ms')
const moment = require('moment')
const db = require('quick.db')

//Hosting Code
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Doge is Online!'))

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
)

const client = new Discord.Client({
    restTimeOffset: 0,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
})
require('discord-buttons')(client)

client.login(mySecret)

client.memer = new Meme(api_token)
client.prefix = prefix

client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.cooldowns = new Discord.Collection()
client.points = new Enmap({ name: 'points' })
const leveling = require('./ranking')
leveling(client)

;['command'].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})
client.on('warn', (info) => console.log(info))
client.on('error', console.error)
module.exports = client

mongoose.connection.on('connected', () => {
    console.log('Mongoose has successfully connected!')
})

mongoose.connection.on('err', (err) => {
    console.error(`Mongoose connection error: \n${err.stack}`)
})

mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose connection lost')
})
client.eco = new economy(mongoDB)
client.on('message', async (message) => {
    if (message.author.bot) return
    if (!message.guild) return
    if (!message.content.startsWith(prefix)) return

    if (!message.member)
        message.member = await message.guild.fetchMember(message)

    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const cmd = args.shift().toLowerCase()

    if (cmd.length === 0) return

    // Get the command
    let command = client.commands.get(cmd)
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd))

    // If a command is finally found, run the command
    if (command) command.run(client, message, args)
})

client.on('messageDelete', async function (message) {
    let chx = db.fetch(`modlogs_${message.guild.id}`)
    const channel = message.guild.channels.cache.get(chx)
    if (chx === null) {
        return
    }
    if (message.author.bot) {
        return
    }

    let logs = await message.guild.fetchAuditLogs({ type: 72 })
    let entry = logs.entries.first()

    const embed = new Discord.MessageEmbed()
        .setTitle('Message Deleted!')
        .addField('Deleted Message', message)
        .addField('Deleted By', `${entry.executor}`)
        .setFooter(`Message was deleted at`)
        .setTimestamp(new Date())

    channel.send(embed)
})

