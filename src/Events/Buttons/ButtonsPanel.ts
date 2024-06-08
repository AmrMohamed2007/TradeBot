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
                  
                 
                        return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.components.createAccount.verified}`, embeds: [], ephemeral: true })

                  

                }



                else if (btntype.includes("report") || btntype.includes("transfer") ) {
                    if (res.verified) {
                        await client.captcha.CaptchaShape(client, interaction, langdata, "reply", true, btntype)

                    } else {
                        return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, embeds: [], ephemeral: true })

                    }

                }
                else if( btntype.includes("daily")) {
                    if (res.verified) {
                        await client.captcha.CaptchaShape(client, interaction, langdata, "reply", false, btntype)

                    } else {
                        return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, embeds: [], ephemeral: true })

                    }
                }

                else {
                    await client.captcha.CaptchaShape(client, interaction, langdata, "reply", true, btntype)

                }

            }).catch(async (err) => {
                console.log(err);
                
                if (btntype.includes("create")) {

                    await client.captcha.CaptchaShape(client, interaction, langdata, "reply", false, btntype)

                }


            })
        }



    }
}

export default Event;
