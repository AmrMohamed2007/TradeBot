import { ApplicationCommandType, ApplicationCommandOptionType, Client } from 'discord.js'

const grerorll = {
    name: "greroll",
    description: " Reroll Giveaway .",
    type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    options: [{ name: "message_id", "description": "Enter MessageId of giveaway", type: ApplicationCommandOptionType.String, required: true },

    ],
    userPerms:["ManageGuild"],
    run: async (client: Client, interaction: any, langdata: any) => {

        const messageId = interaction.options.getString('message_id');
        client.giveawaysManager
            .reroll(messageId)
            .then(() => {
                interaction.reply(`${langdata.giveaway.rerollmsg.replace("[emoji]", client.config.emojis.true)}`);
            })
            .catch((err) => {
                interaction
                    .reply({
                        content: `${langdata.giveaway.error.replace("[emoji]", client.config.emojis.false)}\n${err.message}`,
                        ephemeral: true,
                    })
            });
    }
};

export default grerorll;