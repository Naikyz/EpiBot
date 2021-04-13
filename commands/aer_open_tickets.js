const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const ms = require('ms');
const { prefix } = require('../config.json');

let tooShort = new Discord.MessageEmbed()
                .setColor('#ff0101')
                .setTitle('ERREUR')
                .setThumbnail('https://images-ext-2.discordapp.net/external/30CODjMPnguvmCinQyOFDTJOjEZvS6s-qsGgZrg2Z24/https/i.imgur.com/Q1rdarX.png')
                .addField("Phrases trop courte", `Vous devez construire une phrase précise, d'au moins 10 mots`)
                .setTimestamp();

let alreadyExist = new Discord.MessageEmbed()
                .setColor('#ff0101')
                .setTitle('ERREUR')
                .setThumbnail('https://images-ext-2.discordapp.net/external/30CODjMPnguvmCinQyOFDTJOjEZvS6s-qsGgZrg2Z24/https/i.imgur.com/Q1rdarX.png')
                .addField("Ticket Existant", `Vous avez déjà un ticket, veuillez fermer votre ticket existant avant d'en ouvrir un nouveau !`)
                .setTimestamp();

module.exports = {
    name: 'aer',
    description: 'Test command',
    execute(message, args) {
        function get_problem(args) {
            var res = "";
            for (var i = 0; i < args.length; i++) {
                res = res + args[i] + " ";
            }
            return res;
        }
        message.delete();
        if (args.length > 9) {
            let closeTickets = new Discord.MessageEmbed()
                .setColor('#ff0101')
                .setTitle('Nouveau Ticket')
                .setThumbnail('https://images-ext-2.discordapp.net/external/30CODjMPnguvmCinQyOFDTJOjEZvS6s-qsGgZrg2Z24/https/i.imgur.com/Q1rdarX.png')
                .addField("Fermeture", `Pour fermer ce ticket, ${prefix}close`)
                .setTimestamp();
            if(message.guild.channels.cache.find(channel => channel.name === `needhelp-${message.author.id}`)) {
			    message.author.send(alreadyExist);
                return;
		    }
            message.guild.channels.create(`needhelp-${message.author.id}`, {
                permissionOverwrites: [
                    {
                        id: message.author.id,
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: message.guild.roles.cache.find(r => r.name === "AER"),
                        allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
                    },
                    {
                        id: message.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL'],
                    },
                ],
                type: 'text',
            }).then(async channel => {
                channel.send(closeTickets);
                channel.send(`${message.guild.roles.cache.find(r => r.name === "AER")} : ${message.author} a ce problème :`);
                channel.send(get_problem(args));
            });
        } else
            message.author.send(tooShort);
    }
};