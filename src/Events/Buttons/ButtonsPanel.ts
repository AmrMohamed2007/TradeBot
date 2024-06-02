import { ButtonInteraction, Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ButtonInteraction) => {
        if (interaction.isButton() && interaction.customId.startsWith("acc_")) {
            const langdata = await client.GetLang(client, interaction.guild.id)


            const btntype = interaction.customId.split("_")[1]
            await client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
                if (btntype.includes("create")) {
                    if(res.verified) {
                        return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.components.createAccount.verified}`,embeds:[],ephemeral:true })

                    }else {
                        await interaction.showModal(await client.public.ModalCreateAcc(res.password ? "password" : "nopassword",langdata))
                    }

                }


                else if (btntype.includes("transfer")) {


                    await client.captcha.CaptchaShape(client, interaction, langdata, "reply", false, btntype)

                }
                else if (btntype.includes("report")) {
                    await client.captcha.CaptchaShape(client, interaction, langdata, "reply", false, btntype)

                }
                else {
                    await client.captcha.CaptchaShape(client, interaction, langdata, "reply", true, btntype)

                }

            }).catch(async (err) => {

                if (btntype.includes("create")) {


                    await interaction.showModal(await client.public.ModalCreateAcc("nopassword",langdata))

                }else {
                    await interaction.reply({content:`${client.config.emojis.false} ${langdata.captcha.errornoacc}`})
                }


            })
        }



    }
}

export default Event;