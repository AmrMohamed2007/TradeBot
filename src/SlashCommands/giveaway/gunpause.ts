import { ApplicationCommandType, Client, ApplicationCommandOptionType } from 'discord.js'

const gunpause = {
  name: "gunpause",
  description: "Unpause Giveaway .",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1000,
  options: [
    { name: "message_id", "description": "Enter MessageId of giveaway", type: ApplicationCommandOptionType.String, required: true }
  ],
  userPerms:["ManageGuild"],
  botPerms:["AddReactions","SendMessages"],
  run: async (client: Client, interaction: any, langdata: any) => {

    const messageId = interaction.options.getString('message_id');

    client.giveawaysManager
      .unpause(messageId)
      .then(() => {
        interaction.reply(`${langdata.giveaway.unpausemsg.replace("[emoji]", client.config.emojis.true)}`);
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

export default gunpause;