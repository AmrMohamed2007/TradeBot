import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"

import ms from "ms"
import pretty from "pretty-ms"
import { Client } from "discord.js"

const Event = {
    name: "interactionCreate",
    once: false,
    run: async (client: Client, interaction: any) => {
        if(interaction.customId == "verifyemail") {
            const langdata = await client.GetLang(client, interaction.guild.id)

            await interaction.showModal(await client.public.ModalVerifyModal(langdata))
    
        }
    
    }
}


export default Event;