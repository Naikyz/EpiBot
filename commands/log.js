const { DiscordAPIError } = require("discord.js");
const Discord = require('discord.js');
const ms = require('ms');
const { perm } = require('../config.json');

class Answer {
    constructor(number, student, id) {
        this.number = number;
        this.student = student;
        this.id = id;
    }
}

function check_name(Answer, userid) {
    let rt_val = 0;
    for (var i = 0; i < Answer.length; i++) {
        if (userid === Answer[i].id)
            rt_val = 1;
    }
    return rt_val;
}

function change_react(Answer, userid, newNb) {
    for (var i = 0; i < Answer.length; i++) {
        if (userid === Answer[i].id) {
            Answer[i].number = newNb;
            return;
        }
    }
    return;
}

function setEmbed(nb) {
    let setEmbed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setTitle('Réponse envoyée')
        .setThumbnail('https://i.pinimg.com/originals/79/27/d3/7927d36e2b05125a79327c37610bcc4c.png')
        .addField("Réponse", nb)
        .setTimestamp()
    return setEmbed;
}

function list_response(Answer) {
    let rep;
    Answer.forEach(element => {
        if (rep != null && element.id != null)
            rep = rep + element.student + "         " + element.number + "\n";
        else if (element.id != null && rep == null)
            rep = element.student + "         " + element.number + "\n";
        else if (Answer == null || element == null)
            rep = "Personne n'a répondu";
    });
    return (rep);
}

function changeEmbed(nb) {
    let changeEmbed = new Discord.MessageEmbed()
        .setColor('#ff8401')
        .setTitle('Réponse changée')
        .setThumbnail('https://cdn.iconscout.com/icon/free/png-256/loading-443-1116730.png')
        .addField("Nouvelle Réponse", nb)
        .setTimestamp()
    return changeEmbed;
}

function handleReact(r, user, newAnswer, emoji, number, message) {
    if (check_name(newAnswer, user.id) == 0) {
        newAnswer.push(new Answer(number, (message.guild.member(user).nickname !== null) ? message.guild.member(user).nickname + ` (@${user.username})` : `${user.username}`, user.id));
        let embedSet = setEmbed(emoji);
        user.send(embedSet);
    } else if (check_name(newAnswer, user.id) == 1) {
        change_react(newAnswer, user.id, number);
        let embedChange = changeEmbed(emoji);
        user.send(embedChange);
    }
    r.users.remove(user.id);
}

function ping_roles(args) {
    var roles = "PING :";

    if (args[1] !== undefined) {
        for (var i = 1; args[i]; i++) {
            roles = roles + args[i];
        }
    } else
        roles = "@everyone";
    return roles;
}

module.exports = {
    name: 'logs',
    description: 'Test command',
    execute(message, args) {
        message.delete();
        if (message.member.roles.cache.some(role => role.name === perm)) {
            message.channel.send(ping_roles(args)).then(async message => { message.delete(); });
            let time = args[0];
            let invalidTime = new Discord.MessageEmbed()
                .setColor('#ff0101')
                .setTitle('ERREUR')
                .setThumbnail('https://images-ext-2.discordapp.net/external/30CODjMPnguvmCinQyOFDTJOjEZvS6s-qsGgZrg2Z24/https/i.imgur.com/Q1rdarX.png')
                .addField("Temps invalide", "Entrer un temps supérieur à 1m\nEXEMPLE: \`1m\` \`1h\` \`1d\`")
                .setTimestamp()
            if (!ms(time) || time <= 0) {
                message.author.send(invalidTime);
                return;
            }
            let newAnswer = [];
            let embed = new Discord.MessageEmbed()
                .setColor('#0187ff')
                .setTitle(`Log du jour`)
                .setAuthor(`${message.author.tag}`)
                .setTimestamp()
                .setThumbnail("https://images-ext-1.discordapp.net/external/nE6VlTPRFGNLPd3tq5U8J8Fwlli3EXrLa0M9qqGmO9U/https/i.imgur.com/8qCFYLj.png")
                .addField("Temps", "> Vous avez `" + args[0] + "` pour réagir au formulaire de log")
                .addField("Comment s'est passé votre journée ?", ":one: Pas bien :sob:\n\n :two: Bof :confused:\n\n:three: Sympa :slight_smile:\n\n:four: Cool :sunglasses:\n\n:five: Incroyable :laughing:")
            message.channel.send(embed)
                .then(async message => {
                    message.react("1️⃣")
                    message.react("2️⃣")
                    message.react("3️⃣")
                    message.react("4️⃣")
                    message.react("5️⃣")
                    const oneFilter = (reaction, user) => reaction.emoji.name === "1️⃣" && user.id !== message.author.id;
                    const twoFilter = (reaction, user) => reaction.emoji.name === "2️⃣" && user.id !== message.author.id;
                    const threeFilter = (reaction, user) => reaction.emoji.name === "3️⃣" && user.id !== message.author.id;
                    const fourFilter = (reaction, user) => reaction.emoji.name === "4️⃣" && user.id !== message.author.id;
                    const fiveFilter = (reaction, user) => reaction.emoji.name === "5️⃣" && user.id !== message.author.id;

                    const one = message.createReactionCollector(oneFilter, {time: ms(time), dispose: true});
                    const two = message.createReactionCollector(twoFilter, {time: ms(time), dispose: true});
                    const three = message.createReactionCollector(threeFilter, {time: ms(time), dispose: true});
                    const four = message.createReactionCollector(fourFilter, {time: ms(time), dispose: true});
                    const five = message.createReactionCollector(fiveFilter, {time: ms(time), dispose: true});

                    one.on("collect", (r, user) => {
                        handleReact(r, user, newAnswer, "1️⃣", "1/5", message)
                    });
                    two.on("collect", (r, user) => {
                        handleReact(r, user, newAnswer, "2️⃣", "2/5", message)
                    });
                    three.on("collect", (r, user) => {
                        handleReact(r, user, newAnswer, "3️⃣", "3/5", message)
                    });
                    four.on("collect", (r, user) => {
                        handleReact(r, user, newAnswer, "4️⃣", "4/5", message)
                    });
                    five.on("collect", (r, user) => {
                        handleReact(r, user, newAnswer, "5️⃣", "5/5", message)
                    });
                    setTimeout(() => {
                        message.delete();
                        let finish = new Discord.MessageEmbed()
                            .setColor('#1f6e00')
                            .setTitle('Logs Terminés')
                            .setThumbnail('https://neobridge.com/assets/imgs/index/validate.png')
                            .setTimestamp()
                        message.channel.send(finish);
                    }, ms(time))
                });
            setTimeout(() => {
                let finish_send = new Discord.MessageEmbed()
                    .setColor('#1f6e00')
                    .setTitle('Logs Terminés')
                    .setThumbnail('https://neobridge.com/assets/imgs/index/validate.png')
                    .addField('Listes des réponses :', '\`' + list_response(newAnswer) + '\`')
                    .setTimestamp()
                newAnswer.splice(0, newAnswer.length);
                message.author.send(finish_send);
            }, ms(time))
        } else {
            let noPermission = new Discord.MessageEmbed()
                .setColor('#ff0101')
                .setTitle('ERREUR')
                .setThumbnail('https://images-ext-2.discordapp.net/external/30CODjMPnguvmCinQyOFDTJOjEZvS6s-qsGgZrg2Z24/https/i.imgur.com/Q1rdarX.png')
                .addField("Vous n'avez pas la permission d'executer cette commande", `Vous devez être ${perm}`)
                .setTimestamp()
            message.author.send(noPermission);
        }
    }
};