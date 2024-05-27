import { Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: Interaction, langdata: any) => {
        if (interaction.isModalSubmit() && interaction.customId.startsWith("setupdata_")) {
            const type = interaction.customId.split("_")[1]

            const langdata = await client.GetLang(client, interaction.guild.id)

            const lastpassword = type == "last" ? interaction.fields.getTextInputValue("lastpassword") : null
            const newpassword = interaction.fields.getTextInputValue("newpassword") || null
            const confirmpassword = interaction.fields.getTextInputValue("confirmpassword") || null
            if (newpassword !== confirmpassword) {
                return await interaction.reply({ content: `${langdata.errorr.passworderror}` })
            }

            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
              
                if (type == "new") {
                    res.password = `${newpassword}`;
                    res.save();
                    await interaction.reply({ content: `${client.config.emojis.true} ${langdata.private.passworddoneset}` })

                } else {
                    if (`${lastpassword}` !== `${res.password}`)
                        return await interaction.reply({ content: `${client.config.emojis.false} ${langdata.errorr.passworderror}`,ephemeral:false })

                    res.password = `${newpassword}`;
                    res.save();
                     await interaction.reply({ content: `${client.config.emojis.true} ${langdata.private.passworddoneset}` })
                }
            })
        }



    }
}

export default Event;