import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"


import { Client } from "discord.js"
const Event = {
    name: "terraTransfer",
    once: false,
    run: async (client: Client, interaction: any,langdata:any) => {
        await client.functions.get.GetUser(client.schema,{ status: "one", key: "userid", value: interaction.user.id }).then(async (res) => {

        await interaction.showModal(await client.public.ReturnModalTransferT(langdata));
        
    }).catch(async (err) => {
        console.log(langdata);
        
        await interaction.reply({content:`${langdata.captcha.errornoacc}`,ephemeral:true})
    })


    }
}

export default Event;