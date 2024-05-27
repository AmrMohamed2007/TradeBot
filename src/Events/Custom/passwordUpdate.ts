import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "passwordUpdate",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
            
            if (res && res.blacklisted.bool) {


                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                interaction.reply({ embeds: [embed], ephemeral: true })
            } else if (res && res.scummer.bool) {


                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                })
                interaction.reply({ embeds: [embed], ephemeral: true })
            } else {

                await interaction.showModal(await client.public.SetupModaldata(langdata, res.password ? "last" : "new"))
            }
        })


    }
}

export default Event;