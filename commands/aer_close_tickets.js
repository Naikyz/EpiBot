const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const ms = require('ms');

let tooShort = new Discord.MessageEmbed()
                .setColor('#ff0101')
                .setTitle('ERREUR')
                .setThumbnail('https://images-ext-2.discordapp.net/external/30CODjMPnguvmCinQyOFDTJOjEZvS6s-qsGgZrg2Z24/https/i.imgur.com/Q1rdarX.png')
                .addField("Mauvais salon", `Le salon que vous avez sélectionner n'est pas un salon ticket`)
                .setTimestamp();

module.exports = {
    name: 'close',
    description: 'close tickets',
    execute(message) {
        message.delete();
        if (message.channel.name.startsWith('needhelp-'))
            message.channel.delete();
        else
            message.author.send(tooShort);
    }
};