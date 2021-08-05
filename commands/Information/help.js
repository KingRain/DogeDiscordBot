const { MessageEmbed } = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
    name: 'help',
    category: 'Information',
    aliases: ['h', 'commandinfo', 'cmds', 'cmd'],
    cooldown: 4,
    usage: 'help [Command]',
    description: 'Returns all Commmands, or one specific command',

    run: async (client, message, args) => {
        if (args[0]) {
            const cmd =
                client.commands.get(args[0].toLowerCase()) ||
                client.commands.get(client.aliases.get(args[0].toLowerCase()))
            if (!cmd || !cmd.name) {
                const emb = new MessageEmbed()
                    .setDescription(
                        `**❌ No information found for command \`${args[0].toLowerCase()}\` !**`
                    )
                    .setColor('#ff0000')
                return message.channel.send(emb)
            }

            let n = cmd.name
            const embed = new MessageEmbed()
                .setColor('#009dff')
                .setTitle(
                    `${n[0].toUpperCase() + n.slice(1, n.length)} command!`
                )
                .addField('Name', cmd.name)

            if (cmd.description) embed.addField('Description', cmd.description)
            if (cmd.aliases)
                embed.addField(
                    'Aliases',
                    cmd.aliases.map((a) => `\`${a}\``).join(', ')
                )
            if (cmd.cooldown)
                embed.addField('Cooldown', `\`${cmd.cooldown} Seconds\``)
            if (cmd.usage)
                embed.addField('Usage', `\`${client.prefix}${cmd.usage}\``)

            return message.channel.send(embed)
        }

        const embed = new MessageEmbed()
            .setColor('#009dff')
            .setTitle('Doge Help')
            .setDescription(
                `Use \`${client.prefix}help [command]\` to get info on a specific command!`
            )
            .setFooter(
                'Made By RainBoi#1553 💙',
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setTimestamp()

        let com = {}
        for (let comm of client.commands.array()) {
            let category = comm.category || 'Unknown'
            let name = comm.name

            if (!com[category]) {
                com[category] = []
            }
            com[category].push(name)
        }
        delete com['Unknown']

        i = 0
        for (const [key, value] of Object.entries(com)) {
            let c = key
            let desc = '`' + value.join('`  `') + '`'

            embed.addField(
                `${
                    c[0].toUpperCase() +
                    c.slice(1, c.length).toLocaleLowerCase()
                }`,
                `**${desc}**`
            )
            i++
        }

        embed.addField(
            'Links',
            `**[Invite](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands) | [Support](https://discord.gg/RQ2a9w83fM) | [Owner's Github](https://github.com/Kingrain) | [Owner's Website](https://kingrain.netlify.com) | By [RainBoi](https://github.com/Kingrain)**`
        )

        //Buttons
        let button1 = new MessageButton()
            .setStyle('url')
            .setURL(
                'https://discord.com/api/oauth2/authorize?client_id=746309537203486770&permissions=8&scope=bot'
            )
            .setLabel('Invite')

        let button2 = new MessageButton()
            .setStyle('url')
            .setURL('https://discord.gg/RQ2a9w83fM')
            .setLabel('Support')

        let button3 = new MessageButton()
            .setStyle('url')
            .setURL('https://github.com/Kingrain')
            .setLabel('Github')

        let button4 = new MessageButton()
            .setStyle('url')
            .setURL('https://kingrain.netlify.com')
            .setLabel("Owner's Website")

        let row = new MessageActionRow().addComponents(
            button1,
            button2,
            button3,
            button4
        )

        return message.channel.send(embed, row)
    },
}
