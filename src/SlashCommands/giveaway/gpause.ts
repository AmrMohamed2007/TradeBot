import { ApplicationCommandType, ApplicationCommandOptionType,Client } from 'discord.js'

const gpause = {
  name: "gpause",
  description: "Pause Giveaway .",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1000,
  options: [
    { name: "message_id", "description": "Enter MessageId of giveaway", type: ApplicationCommandOptionType.String, required: true }
  ],
  run: async (client: Client, interaction: any, langdata: any) => {
 

    const messageId = interaction.options.getString('message_id');

    client.giveawaysManager
      .pause(messageId)
      .then(() => {
        interaction.reply('** Success! Giveaway Paused!**');
      })
      .catch((err) => {
        interaction.reply(`**:x:

 | An error has occurred, please check and try again.\n\`${err}\`**`);
      });

  }
};

export default gpause