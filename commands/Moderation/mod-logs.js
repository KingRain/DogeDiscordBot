const Discord = require('discord.js');
const {MessageEmbed} = require('discord.js');
const db = require('quick.db');
module.exports={
    name: 'mod-logs',
    category: 'Moderation',
    description: 'Set a channel for mod-logs, that are really useful.',
    aliases: ['ml'],
    usage: '.mod-logs <mention a channel>',
    run: async(client, message, args)=>{
        try{
            if(!message.member.hasPermission(["MANAGE_GUILD"])) return message.reply("You don\'t have the permission to use this command.\nYou need \`MANAGE_SERVER\` permission, to use this command.");
            let channel = message.mentions.channels.first();
            let questionMessage;
            let collected;
            let messageFilter = (m) => m.author.id === message.author.id;
            if(!channel) {
                async function verifyChannel() {
                    return new Promise(async (resolve, reject) => {
                        collected = await message.channel.awaitMessages(
                            messageFilter,
                            { max: 1, time: 600000 },
                        );
                        if (collected.size === 0) reject(`Timeout`);
                        else if (collected.first().mentions.channels.size === 0) {
                            if (
                                collected.first().content.toLowerCase() === 'cancel'
                            ) {
                                reject(`Exiting`);
                            } else {
                                let error = await message.channel.send('Please mention a channel, for the mod logs. You can type \`cancel\`, if you want to cancel the setup.');
                                error.delete({ timeout: 5000 });
                                resolve(verifyChannel());
                            }
                        } else {
                            resolve(collected.first().mentions.channels.first());
                        }
                    });
                }
                questionMessage = await message.channel.send('Which channel do you want to set for mod logs? You can type \`cancel\`, if you want to cancel the setup.');
                try {
                    let chan = message.mentions.channels.first();
                    chan = await verifyChannel();
                    await db.set(`modlogs_${message.guild.id}`, chan.id)
                    const wasset1 = new Discord.MessageEmbed()
                    .setTitle(`Mod-logs`)
                    .setDescription(`🟢 Mod-logs for **${message.guild.name}**, is now set as ${chan}`)
                    .setColor('#2f3136')
                    .setTimestamp(new Date())
                    .setFooter(client.user.username, client.user.avatarURL())
                    await message.channel.send(wasset1)
                } catch (e) {
                    if (e === `Exiting`) {
                        return message.channel.send(`Successfully cancelled the setting of channel for mod logs`).then(message => message.delete({ timeout: 10000 }));
                    } else if (e === `Timeout`) {
                        await message.channel.send(`mod logs setup has timed out. Please run the command again.`,);
                    }
                }
            }
            else if(channel){
                db.set(`modlogs_${message.guild.id}`, channel.id)
                const wasset = new Discord.MessageEmbed()
                .setTitle(`Mod-logs`)
                .setDescription(`🟢 Mod-logs for **${message.guild.name}**, is now set as ${channel}`)
                .setColor('#2f3136')
                .setTimestamp(new Date())
                .setFooter(client.user.username, client.user.avatarURL())
                message.channel.send(wasset)
            }
        }catch(err){
            console.log(err);
            return message.channel.send('Oops, looks like an error occured')
        }
    }
}