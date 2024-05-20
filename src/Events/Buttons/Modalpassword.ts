import { Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction) => {
        if (interaction.isModalSubmit() && interaction.customId.startsWith("modalpassword")) {
            const Fun = interaction.customId.split("_")[1]
            const password = interaction.fields.getTextInputValue("passwordmodal")
            await client.functions.get.GetUser(client.schema,{ status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
                const Checked = await client.captcha.CaptchaPassword(res.password, password)
                const langdata = await client.GetLang(client, interaction.guild.id)
                if (Checked) {
                    client.emit(`${Fun}`,interaction,langdata)
                 
                } else {
                    interaction.reply({ content: `${langdata.captcha.errorpassword}`, ephemeral: true })
                }
            })
        }



    }
}

export default Event;