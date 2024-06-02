import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "createAccount",
    once: false,
    run: async (client: Client, interaction: ModalSubmitInteraction, langdata: any) => {
        const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${client.config.emojis.loading} ${langdata.captcha.waiting}` })], ephemeral: true })

        const accountCreationDate = interaction.user.createdAt;
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        if (accountCreationDate > oneMonthAgo) {
            await Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}` })

        } else {



            await client.functions.create.CreateUser(client.schema, { key: "userid", value: interaction.user.id }).then(async (res) => {
                await res.save();
                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.true} ${langdata.private.createdacc}`,
                    color: client.config.maincolor,
                })
                await Msg.edit({ embeds: [embed] })



            }).catch(async (err) => {
                const embed = await client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.private.errorhaveacc}`,
                    color: client.config.wrongcolor,
                })
                await Msg.edit({ embeds: [embed] })


            })
        }


    }
}

export default Event;