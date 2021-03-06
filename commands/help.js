const { prefix } = require('../config.js');

module.exports = {
    name: 'help',
    aliases: ['commands'],
    description: `List all of my commands or info about a specific command`,
    cooldown: 5,
    usage: '[command name]',
    execute(message, args) {

        const data = [];
        const { commands } = message.client;

        // '!help' => Display all commands
        if (!args.length) {
            data.push(`All commands:`);
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nTry \`${prefix}help [command name]\` to get info on a specific command`);

            return message.author.send(data, { split: true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply(`I've sent you a DM with all my commands!`);
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply(`it seems like I can't DM you. Do you have DMs disabled?`);
                });
        }

        // Here, a command has been specified
        const name = args[0].toLowerCase();
        const command = commands.get(name) 
            || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply(`that's not a valid command!`);
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, {split: true});
        
    },
};