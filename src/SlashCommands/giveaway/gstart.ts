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
    {
      name: `count`,
      description: `count of giveaways`,
      required: false,
      type: 10,
    },
  ],
  cooldown: 3000,
  botPerms:["AddReactions","SendMessages"],
  userPerms: ["ManageGuild"],
  run: async (client: Client, interaction: any, langdata: any) => {


    const duration = interaction.options.getString(`duration`);
    const winnerCount = interaction.options.getNumber(`winners`);
    const prize = interaction.options.getString(`prize`);
    const count = interaction.options.getNumber(`count`) || 1;

    if(count > 5)
      return interaction.reply({content:`${langdata.giveaway.counterror}`,ephemeral:true});

    if(!ms(duration))
      return interaction.reply({content:`${langdata.giveaway.counterror}`,ephemeral:true});

    if(ms(duration) > ms("14d"))
      return interaction.reply({content:`${langdata.giveaway.counterror}`,ephemeral:true});


    const ss = client.giveawaysManager.giveaways.filter((g) => g.guildId === interaction.guild.id);
 
  const onServer = ss.filter((g) => !g.ended);

  
    if(onServer.length > 15 || (onServer.length + count) > 15 )
      return interaction.reply({content:`${langdata.giveaway.lengtherror}`,ephemeral:true});




    const Msg = await interaction.reply({content:`${langdata.captcha.waiting.replace("<thing>","Making it")}`,ephemeral:true})

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

      await Msg.edit({content:`${langdata.giveaway.donemaked}`,ephemeral:true})

      for (let i = 0; i < count; i++) {
      

     
       await client.giveawaysManager
        .start(interaction.channel, {
          duration: ms(duration),
          winnerCount,
          prize,
          image: Database.image,
          thumbnail: Database.thumbnail,
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
      
       
        })
        .catch((err) => {
          err = 0
        });
      }

    })
  },
};

export default gstart