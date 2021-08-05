const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
const { Color } = '#009dff'

module.exports = {
    name: 'coinflip',
    aliases: ['toss', 'flip'],
    category: 'Fun',
    description: 'Flip A Coin!',
    usage: 'Coinflip',
    run: async (client, message, args) => {
        //Start
        const coins = ['Heads', 'Tails', 'Center']

        let result = Math.floor(Math.random() * coins.length)

        const embed = new MessageEmbed()
            .setColor(Color)
            .setTitle(`Coin Is`)
            .setDescription(coins[result])
            .setFooter(`Fliped by ${message.author.username}`)
            .setTimestamp()

        message.channel.send(embed)

        //End
    },
}
