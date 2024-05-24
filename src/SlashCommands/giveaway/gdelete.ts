import { ApplicationCommandType, ApplicationCommandOptionType,Client } from 'discord.js'

const gdelete = {
  name: "gdelete",
  description: "Delete Giveaway .",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1000,
  options: [
    { name: "message_id", "description": "Enter MessageId of giveaway", type: ApplicationCommandOptionType.String, required: true }
  ],
  run: async (client: Client, interaction: any, langdata: any) => {

    const messageId = interaction.options.getString('message_id');

    client.giveawaysManager
      .delete(messageId)
      .then(() => {
        interaction.reply('** Success! Giveaway Deleted!**');
      })
      .catch((err) => {
        interaction.reply({
          content: `**:x:
 | An error has occurred, please check and try again.\n\`${err}\`**`, ephemeral: true
        });
      });

  }
};

export default gdelete