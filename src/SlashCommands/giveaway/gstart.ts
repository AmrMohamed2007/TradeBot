import { ApplicationCommandType ,Client} from 'discord.js'

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
  run: async (client: Client, interaction: any, langdata: any) => {
   

    const duration = interaction.options.getString(`duration`);
    const winnerCount = interaction.options.getNumber(`winners`);
    const prize = interaction.options.getString(`prize`);

    client.giveawaysManager
      .start(interaction.channel, {
        duration: ms(duration),
        winnerCount,
        prize,
        messages: {
          giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
          giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
          title: '{this.prize}',
          drawing: 'Drawing: {timestamp}',
          dropMessage: 'Be the first to react with 🎉 !',
          inviteToParticipate: 'React with 🎉 to participate!',
          winMessage: 'Congratulations, {winners}! You won **{this.prize}**!\n{this.messageURL}',
          embedFooter: '{this.winnerCount} winner(s)',
          noWinner: 'Giveaway cancelled, no valid participations.',
          hostedBy: 'Hosted by: {this.hostedBy}',
          winners: 'Winner(s):',
          endedAt: 'Ended at'
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
            content: `**:x:
 | An error has occurred, please check and try again.\n\`${err}\`**`,
            ephemeral: true,
          })
          .catch((err) => {
            err = 0;
          });
      });
  },
};

export default gstart