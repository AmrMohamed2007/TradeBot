import { ButtonInteraction, Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: any) => {
        if (interaction.isButton() && interaction.customId.startsWith("findscammer_")) {
            const langdata = await client.GetLang(client, interaction.guild.id)


      
            await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guildId }).then(async (res) => {
                if (!res.panel || !res.panel.bool) {
                    return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.panel.nopanel}`,ephemeral:true });
                }
     

                await interaction.showModal(await client.public.ReturnModalSc(langdata,"find"))

            }).catch(async (err) => {

                return await interaction.reply({ content: `${langdata.panel.nopanel}`,ephemeral:true });
             


            })
        }



    }
}

export default Event;