const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Test command',
    execute(message) {
        var embed = new Discord.MessageEmbed()
            .setColor('#0187ff')
            .setTitle('Help')
            .setThumbnail("https://images-ext-1.discordapp.net/external/nE6VlTPRFGNLPd3tq5U8J8Fwlli3EXrLa0M9qqGmO9U/https/i.imgur.com/8qCFYLj.png")
            .setAuthor("Naikyz & MrSlooth & Kogity")
            .addField("Commandes disponibles", "\`!help\` : Consulter le manuel d'aide\n\n\`!log\` [TEMPS]: Lancer un formulaire de log\n\nTEMPS= \`1m\` \`1h\` \`1d\`")
        message.channel.send(embed);
    }
};