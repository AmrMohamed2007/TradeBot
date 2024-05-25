import { ApplicationCommandType, Client } from 'discord.js'

import ms from "ms"
const gstart = {
  name: `gstart`,
  description: `Start Giveaway .`,
  type: ApplicationCommandType.ChatInput,

  options: [
    {
      name: `duration`,
      description: `Enter time of giveaway`,
      type: 3,
      required: true,
    },
    {
      name: `winners`,
      description: `enter count of winners`,
      required: true,
      type: 10,
    },
    {
      name: `prize`,
      description: `enter prize of giveaway`,
      required: true,
      type: 3,
    },
  ],
  cooldown: 1000,
  botPerms: ["SendMessages", "AddReactions"],
  userPerms: ["ManageGuild"],
  run: async (client: Client, interaction: any, langdata: any) => {


    const duration = interaction.options.getString(`duration`);
    const winnerCount = interaction.options.getNumber(`winners`);
    const prize = interaction.options.getString(`prize`);


    await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guild.id, create: true }).then(async (Database) => {


      await Database?.save();


      client.giveawaysManager.options = {
        default: {
          botsCanWin: false,
          embedColor: Database.color_start,
          embedColorEnd: Database.color_end,
          reaction: Database.reaction
        }


      }




      await client.giveawaysManager
        .start(interaction.channel, {
          duration: ms(duration),
          winnerCount,
          prize,
          image: Database.image,
          thumbnail: Database.image,
          messages: {
            giveaway: `${langdata.giveaway.giveawaycontent.replace("[emoji]", Database.reaction).replace("[emoji]", Database.reaction)}`,
            giveawayEnded: `${langdata.giveaway.giveawayEnded.replace("[emoji]", Database.reaction).replace("[emoji]", Database.reaction)}`,
            title: '{this.prize}',
            drawing: `${langdata.giveaway.drawing.replace("[emoji]", Database.reaction)}`,
            dropMessage: `${langdata.giveaway.dropMessage.replace("[emoji]", Database.reaction)}`,
            inviteToParticipate: `${langdata.giveaway.inviteToParticipate.replace("[emoji]", Database.reaction)}`,
            winMessage: `${langdata.giveaway.winMessage.replace("[emoji]", Database.reaction)}`,
            embedFooter: `{this.winnerCount} ${langdata.giveaway.winners}`,
            noWinner: `${langdata.giveaway.noWinner}`,
            hostedBy: `${langdata.giveaway.hostedBy}`,
            winners: `${langdata.giveaway.winners}`,
            endedAt: `${langdata.giveaway.endedAt}`
          }
        })
        .then((data) => {
          // {...} (messageId, end date and more)
          interaction
            .reply({
              content: `Giveaway succesful started ${data.messageId}`,
              ephemeral: true,
            })
            .catch((err) => {
              err = 0;
            });
        })
        .catch((err) => {
          interaction
            .reply({
              content: `${langdata.giveaway.error.replace("[emoji]", client.config.emojis.false)}\n${err.message}`,
              ephemeral: true,
            })
            .catch((err) => {
              err = 0;
            });
        });
    })
  },
};

export default gstart