import { ButtonInteraction, EmbedBuilder, Interaction, ModalSubmitInteraction, TextChannel } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        const langdata = await client.GetLang(client, interaction.guild.id)

        if (interaction.customId == "addscammermodal") {
            const scammerid = interaction.fields.getTextInputValue("scammerid")
            const amount = interaction.fields.getTextInputValue("amountscummer")
            const usert = interaction.fields.getTextInputValue("usertid")
            const ch = client.channels.cache.get(client.config.channelscammers) as TextChannel
            if (!ch) return;

            await ch.send({ content: `New Scammer\nScammerId : **${scammerid}**\nAmount : **${amount}**\nUserT : **${usert}**\nFrom : **${interaction.guild.name}**` })
            await interaction.reply({content:`${langdata.done.replace("[emoji]",client.config.emojis.true)}`,ephemeral:true})

        }

        if (interaction.customId == "deletescammermodal") {
            const scammerid = interaction.fields.getTextInputValue("scammerid")

            const ch = client.channels.cache.get(client.config.channelscammers) as TextChannel
            if (!ch) return;
            await ch.send({ content: `Delete Scammer\nScammerId : **${scammerid}**\nFrom : **${interaction.guild.name}**` })

            await interaction.reply({content:`${langdata.done.replace("[emoji]",client.config.emojis.true)}`,ephemeral:true})


        }

        if (interaction.customId == "findscammermodal") {
            const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.maincolor, description: `${langdata.captcha.waiting}`, thing: "Proccessing.." })],ephemeral:true })


            const scammerid = interaction.fields.getTextInputValue("scammerid")

             await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: scammerid }).then(async (res) => {

            
    
                const embed = await client.CreateEmbed({
                title:langdata.scammer.doneSearch,
                fields:[
                    { name: `${langdata.private.userid}`, value: `${scammerid}`, inline: true },
                    { name: `${langdata.private.scammerd}`, value: `${res.scummer.bool ? langdata.private.yes : langdata.private.no}`, inline: true }

                ],
                color:client.config.maincolor
            })
            await Msg.edit({embeds:[embed]});
          
          
            }).catch(async (err) => {
                const embed = await client.CreateEmbed({
                    title:langdata.scammer.doneSearch,
                    fields:[
                        { name: `${langdata.private.userid}`, value: `${scammerid}`, inline: true },
                        { name: `${langdata.private.scammerd}`, value: `${langdata.private.unknown}`, inline: true }
    
                    ],
                    color:client.config.maincolor
                })
                await Msg.edit({embeds:[embed]});
              
              
            })


        }



    }
}

export default Event;