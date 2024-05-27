import { ApplicationCommandType, ApplicationCommandOptionType, Client } from 'discord.js'

const gdelete = {
  name: "gdelete",
  description: "Delete Giveaway .",
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
      .delete(messageId)
      .then(() => {
        interaction.reply(`${langdata.giveaway.deletemg.replace("[emoji]", client.config.emojis.true)}`);
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

export default gdelete