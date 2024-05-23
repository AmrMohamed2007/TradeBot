import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        if (interaction.isModalSubmit() && interaction.customId == "transfertmodal") {
            const langdata = await client.GetLang(client, interaction.guild.id)
            const password = interaction.fields.getTextInputValue("transfertmodalpassword")
            const user = interaction.fields.getTextInputValue("transfertmodaluser")
            const amount = interaction.fields.getTextInputValue("transfertmodalamount")
            const reason = interaction.fields.getTextInputValue("transfertmodalreason")
            const Msg = await interaction.reply({ embeds: [await client.waitembed({ color: client.config.wrongcolor, description: `${langdata.captcha.waiting}`, thing: "processing.." })], ephemeral: true })

            await client.functions.get.GetUser(client.schema, { status: "all" }).then(async (res) => {
                try {


                    const MainUser = res.find((m) => m.userid == interaction.user.id)
                    const SecondUser = res.find((m) => m.userid == user)


                    if (!MainUser.password)
                        return await Msg.edit({ embeds: [], content: `${langdata.captcha.nopassword}` });

                    if (!SecondUser)
                        return await Msg.edit({ embeds: [], content: `${langdata.captcha.usershouldhaveacc}` })


                    if (String(MainUser.password) !== String(password))
                        return await Msg.edit({ embeds: [], content: `${langdata.captcha.errorpassword}` })
                    const TransferdAmount = await client.public.ConvertAmount(String(amount));

                    if (MainUser.coins < TransferdAmount)
                        return await Msg.edit({ embeds: [], content: `${langdata.captcha.errorcoinsenough}` })


                    const data = {
                        msg: reason,
                        userr: SecondUser.userid,
                        usert: MainUser.userid,
                        amount: +TransferdAmount,
                        typelog: client.types.TransferTerra,
                        guildid: interaction.guildId
                    }

                    await client.Log.LogFatoraUser(data, langdata)

                    MainUser.coins = MainUser.coins - TransferdAmount;
                    SecondUser.coins = SecondUser.coins + TransferdAmount
                    await MainUser.log.push(data);
                    await SecondUser.log.push(data);
                    await MainUser.save();
                    await SecondUser.save();
                    await Msg.edit({ content: `${langdata.private.donetransfer}`,embeds:[] })
                    await interaction.channel.send({ content: 
                        `${
                            langdata.private.donetransfersend
                            .replace("[userr]",`${SecondUser.userid}`)
                            .replace("[usert]",`${MainUser.userid}`)
                            .replace("[amount]",`${TransferdAmount}`)
                            .replace("[emoji]",`${client.config.emojis.true}`)
                        }`
                     })

                } catch (error) {
                    await Msg.edit({ content: `${langdata.error}\n\`\`\`${error.message}\`\`\``, embeds: [] })

                }
            }).catch(async (err) => {
                await Msg.edit({ content: `${langdata.captcha[err.message]}`, embeds: [] })



            })
        }



    }
}

export default Event;