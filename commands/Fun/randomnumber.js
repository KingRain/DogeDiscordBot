const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'randomnumber',
    aliases: ['rn'],
    category: 'Fun',
    description: 'Get Random Number!',
    usage: 'Randomnumber',
    run: async (client, message, args) => {
        //Start
        let result = Math.floor(Math.random() * 101)

        const embed = new MessageEmbed()
            .setColor('#009dff')
            .setTitle(`Random Number Is`)
            .setDescription([result])
            .setFooter(`1 - 100`)
            .setTimestamp()

        message.channel.send(embed)

        //End
    },
}
