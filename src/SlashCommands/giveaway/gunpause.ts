import { ApplicationCommandType, Client, ApplicationCommandOptionType } from 'discord.js'

const gunpause = {
  name: "gunpause",
  description: "Unpause Giveaway .",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1000,
  options: [
    { name: "message_id", "description": "Enter MessageId of giveaway", type: ApplicationCommandOptionType.String, required: true }
  ],
  run: async (client: Client, interaction: any, langdata: any) => {

    const messageId = interaction.options.getString('message_id');

    client.giveawaysManager
      .unpause(messageId)
      .then(() => {
        interaction.reply('** Success! Giveaway Unpaused!**');
      })
      .catch((err) => {
        interaction.reply({
          content: `**:x:
 | An error has occurred, please check and try again.\n\`${err}\`**`, ephemeral: true
        });
      });

  }
};

export default gunpause;