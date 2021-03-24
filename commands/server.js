module.exports = {
    name: 'log',
    description: 'Test command',
    execute(message) {
        message.channel.send(`LOG`);
    }
};