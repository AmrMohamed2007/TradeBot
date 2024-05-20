import { ButtonInteraction, Interaction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ButtonInteraction) => {
        if (interaction.isButton() && interaction.customId.startsWith("acc_")) {
            const langdata = await client.GetLang(client,interaction.guild.id)

            const Msg = await interaction.reply({embeds:[await client.waitembed({color:client.config.maincolor,description:`${langdata.captcha.waiting}`,thing:"captcha"})],ephemeral:true})

            const btntype = interaction.customId.split("_")[1]
            await client.functions.get.GetUser(client.schema,{ status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {
                if(btntype.includes("transfer")) {
                 
                    
                    await client.captcha.CaptchaShape(client,Msg,langdata,"edit",false,btntype)

                }else {
                    await client.captcha.CaptchaShape(client,Msg,langdata,"edit",false,btntype)

                }
                
            }).catch(async (err) => {
                
                if(btntype.includes("create")) {
                    await client.captcha.CaptchaShape(client,Msg,langdata,"edit",false,btntype)

                }
             

            })
        }



    }
}

export default Event;