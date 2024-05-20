import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

async function TransferModal(langdata:any) {
    const modal = new ModalBuilder()
    .setTitle(langdata.premium.modaltransfertitle)
    .setCustomId("transferaccountmodal")
    
    const Text=  new TextInputBuilder()
    .setRequired(true)
    .setLabel(langdata.premium.labeltransfer)
    .setStyle(TextInputStyle.Short)
    .setCustomId("useridtransfermodal")

    const row = new ActionRowBuilder<TextInputBuilder>()
    .setComponents(Text)

    modal.setComponents(row)

    return modal
   
}
export default {TransferModal}