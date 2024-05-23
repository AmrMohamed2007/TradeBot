import { ButtonInteraction, Interaction, ModalSubmitInteraction } from "discord.js"

import ms from "ms"
import pretty from "pretty-ms"
import { Client } from "discord.js"

const Event = {
    name: "reportAccount",
    once: false,
    run: async (client: Client, interaction: any, langdata: any) => {
     
      
        await interaction.showModal(await client.premium.ReportModal(langdata))
        
    }
}



export default Event;