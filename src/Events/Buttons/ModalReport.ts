import { Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isModalSubmit() && interaction.customId == "reportaccountmodal") {
            const reportmsg = interaction.fields.getTextInputValue("reportaccounttext")
            const channel = client.channels.cache.get(client.config.channelreport)
            const langdata = await client.GetLang(client, interaction.guild.id)

            const embed = await client.CreateEmbed({
                title:"New Bug",
                fields:[
                    {name:"~ UserId",value:interaction.user.id,inline:true}
                ],
                description:`${reportmsg}`,
                color:`${client.config.maincolor}`,
            })
            const embed1 = await client.CreateEmbed({
                color:`${client.config.maincolor}`,
                description:`${langdata.private.donereport}`
            })
            if(channel.type == 0) {
                await channel.send({embeds:[embed]})
                await interaction.reply({embeds:[embed1],ephemeral:true})
            }else return;
        
       

        
        }



    }
}

export default Event;