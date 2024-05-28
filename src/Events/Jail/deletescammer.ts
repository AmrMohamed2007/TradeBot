import { ButtonInteraction, Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: any) => {
        if (interaction.isButton() && interaction.customId.startsWith("deletescammer_")) {
            const langdata = await client.GetLang(client, interaction.guild.id)


      
            await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guildId }).then(async (res) => {
                if (!res.panel || !res.panel.bool) {
                    return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`,ephemeral:true });
                }
                if(!interaction.member.roles.cache.has(res.panel.role)) {
                    return await interaction.reply({ content: `**${client.config.emojis.false} You should have <@&${res.panel.role}>**`,ephemeral:true });
                }
                
                

                await interaction.showModal(await client.public.ReturnModalSc(langdata,"delete"))

            }).catch(async (err) => {

                return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`,ephemeral:true });
             


            })
        }



    }
}

export default Event;