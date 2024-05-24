import { ApplicationCommandType,  ApplicationCommandOptionType,Client } from 'discord.js'

const grerorll = {
	name: "greroll",
	description: " Reroll Giveaway .",
	type: ApplicationCommandType.ChatInput,
	cooldown: 1000,
  options:[{name:"message_id","description":"Enter MessageId of giveaway",type:ApplicationCommandOptionType.String,required:true},
         
          ],
          run: async (client: Client, interaction: any, langdata: any) => {
 
      const messageId = interaction.options.getString('message_id');
        client.giveawaysManager
            .reroll(messageId)
            .then(() => {
                interaction.reply('** Success  Giveaway rerolled!!**');
            })
            .catch((err) => {
                interaction.reply({content:`**:x:
 | An error has occurred, please check and try again.\n\`${err}\`**`,ephemeral:true});
            });
	}
};

export default grerorll;