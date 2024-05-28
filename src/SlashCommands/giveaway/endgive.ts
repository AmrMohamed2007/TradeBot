import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client,

} from "discord.js"

const gend = {
  name: "gend",
  description: "End Giveaway .",
  type: ApplicationCommandType.ChatInput,
  cooldown: 1000,
  options: [
    {
      name: "message_id",
      description: "Enter MessageId of giveaway",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  userPerms:["ManageGuild"],
  botPerms:["AddReactions","SendMessages"],
  run: async (client: Client, interaction: any, langdata: any) => {

    const messageId = interaction.options.getString("message_id");
    client.giveawaysManager
      .end(messageId)
      .then(() => {
        interaction.reply(`${langdata.giveaway.endmsg.replace("[emoji]", client.config.emojis.true)}`);
      })
      .catch((err) => {
        interaction
        interaction
        .reply({
            content: `${langdata.giveaway.error.replace("[emoji]", client.config.emojis.false)}`,
            ephemeral: true,
        })
          .catch((err) => {
            err = 0;
          });
      });
  },
};

export default gend