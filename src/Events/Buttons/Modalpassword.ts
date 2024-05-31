import { Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isModalSubmit() && interaction.customId.startsWith("modalpassword")) {
            const Fun = interaction.customId.split("_")[1]
            const password = interaction.fields.getTextInputValue("passwordmodal")
            const langdata = await client.GetLang(client, interaction.guild.id)

            await client.functions.get.GetUser(client.schema,{ status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
                const Checked = await client.captcha.CaptchaPassword(res.password, password)
                if (Checked) {
                    client.emit(`${Fun}`,interaction,langdata)
                 
                } else {
                    interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errorpassword}`, ephemeral: true })
                }
            }).catch((err) => {
     
                interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true })
            
            })
        }



    }
}

export default Event;