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
            .setAuthor("Kylian Paulin - 2025 :)")
            .addField("Commandes disponibles", "\`!help\` : Consulter le manuel d'aide\n\n\`!logs\` [TEMPS] [PING]: Lancer un formulaire de log\n\nTEMPS= \`1m\` \`1h\` \`1d\` \n\nPING=Roles que vous voulez ping \`exemple : @joueur\` Laisser vide pour ping tout le serveur \`(@everyone)\`")
        message.author.send(embed);
    }
};