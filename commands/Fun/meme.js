const { MessageEmbed } = require('discord.js')
const randomPuppy = require('random-puppy')

module.exports = {
    name: 'meme',
    category: 'Fun',
    description: 'Sends a random meme from Reddit',
    run: async (client, message, args) => {
        const subReddits = ['dankmemes', 'meme', 'me_irl']
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]

        const img = await randomPuppy(random)
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)

        message.channel.send(embed)
    },
}
