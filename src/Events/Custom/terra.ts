import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "terraShow",
    once: false,
    run: async (client: Client, interaction: any,langdata:any) => {
        await client.functions.get.GetUser(client.schema,{ status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {

        const embed = await client.CreateEmbed({
            title: langdata.private.titleuser, fields: [
                { value: `${interaction.user.id}`, name: `${langdata.private.userid}`, inline: true },
                { value: `${res.coins}`, name: `${langdata.private.coins}`, inline: true },
            ],
            color: client.config.maincolor,
        })
        interaction.reply({ embeds: [embed], ephemeral: true })
        
    })


    }
}

export default Event;