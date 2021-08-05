const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: '8ball',
    category: 'Fun',
    description: 'returns a response based on your question',

    run: async (client, message, args) => {
        let cmd = message.content.split(' ')[0]
        if (!args[2])
            return message.channel.send(
                `Please ask a full question. \n Command Syntax: ${cmd} (question)`
            )

        let replies = [
            'It is certain.',
            'It is decidedly so.',
            'Without a doubt.',
            'Yes - definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'Most likely.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            "Don't count on it.",
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.',
        ]

        let result = Math.floor(Math.random() * replies.length)

        const embed = new MessageEmbed()
            .setColor('#009dff')
            .setTitle(`🎱8Ball Says`)
            .setDescription(replies[result])
            .setFooter(`Asked by ${message.author.username}`)
            .setTimestamp()

        message.channel.send(embed)
    },
}
