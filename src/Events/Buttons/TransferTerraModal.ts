import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        if (interaction.isModalSubmit() && interaction.customId == "transferterramodal") {
            const langdata = await client.GetLang(client,interaction.guild.id)
            const password = interaction.fields.getTextInputValue("transfertmodalpassword")
            const user = interaction.fields.getTextInputValue("transfertmodaluser")
            const amount = interaction.fields.getTextInputValue("transfertmodalamount")
            const reason = interaction.fields.getTextInputValue("transfertmodalreason")
            const Msg = await interaction.reply({embeds:[await client.waitembed({color:client.config.maincolor,description:`${langdata.captcha.waiting}`,thing:"captcha"})],ephemeral:true})

            await client.functions.get.GetUser(client.schema,{ status: "all"}).then(async (res) => {
        const MainUser = res.find((m) => m.userid == interaction.user.id)
        const SecondUser = res.find((m) => m.userid == user)
            if(MainUser.password !== password)
            return await   Msg.edit({embeds:[], content: `${langdata.captcha.errorpassword}`})
            
            

                
            }).catch(async (err) => {
            await Msg.edit({content:`${client.captcha[err.message]}`,embeds:[]})    

             

            })
        }



    }
}

export default Event;