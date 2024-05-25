import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "createAccount",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true })
        await client.functions.create.CreateUser(client.schema, { key: "userid", value: interaction.user.id }).then(async (res) => {
            await res.save();
            const embed = await client.CreateEmbed({
                description: `${langdata.private.createdacc}`,
                color: client.config.maincolor,
            })
            Msg.edit({ embeds: [embed], ephemeral: true })



        }).catch(async (err) => {
            const embed = await client.CreateEmbed({
                description: `${langdata.private.errorhaveacc}`,
                color: client.config.wrongcolor,
            })
            Msg.edit({ embeds: [embed], ephemeral: true })


        })


    }
}

export default Event;