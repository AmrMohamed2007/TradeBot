import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "premiumBuy",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
        const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true })
        await client.functions.get.GetUser(client.schema, { key: "userid", value: interaction.user.id, status: "one" }).then(async (res) => {
            if (res.blacklisted.bool || res.scummer.bool)
                return await Msg.edit({ content: `${langdata.error}`, embeds: [] })

            if (res.premium.bool)
                await Msg.edit({ content: `${langdata.premium.errorhavepremium}`, embeds: [] })
            const Data = { name: interaction.guild.name, iconURL: interaction.guild.iconURL() }
            const embed = await client.CreateEmbed({
                title: `${langdata.premium.titlebuy}`,
                fields: [
                    { name: `${langdata.premium.month}`, value: `500 Terra(s)`, inline: true },
                    { name: `${langdata.premium.year}`, value: `2500 Terra(s)`, inline: true },
                ],
                author: Data,
                footer: Data,
                color: client.config.maincolor

            })

            const row = new ActionRowBuilder<ButtonBuilder>()

            const btn1 = new ButtonBuilder()
                .setCustomId("monthpremium")
                .setStyle(ButtonStyle.Secondary)
                .setLabel(`${langdata.premium.month}`)
                .setEmoji(client.config.emojis.logo)

            const btn2 = new ButtonBuilder()
                .setCustomId("yearpremium")
                .setStyle(ButtonStyle.Success)
                .setLabel(`${langdata.premium.year}`)
                .setEmoji(client.config.emojis.logo)

            row.setComponents(btn1, btn2);

            await Msg.edit({ embeds: [embed], components: [row] })


        }).catch(async (err) => {
            console.log(err);

            await Msg.edit({ content: `${langdata.error}`, embeds: [] })
        })
    }
}

export default Event;