module.exports = {
    name: 'prune',
    description: 'Prune messages',
    execute(message, args) {
        const amount = parseInt(args[0]) + 1;

            if (isNaN(amount)) {
                return message.reply('that doesn\'t seem like a valid number cuz.');
            } else if (amount < 1 || amount > 100) {
                return message.reply('you need to input a number between 1 and 100.');
            }
            message.channel.bulkDelete(amount,true).catch(err => {
                console.log(err);
                message.channel.send('there was an error trying to prune messages in this channel');
            });

    },
};