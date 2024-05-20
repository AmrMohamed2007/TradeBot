import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

async function ReportModal(langdata:any) {
    const modal = new ModalBuilder()
    .setTitle(langdata.premium.modalreporttitle)
    .setCustomId("reportaccountmodal")
    
    const Text=  new TextInputBuilder()
    .setRequired(true)
    .setLabel(langdata.premium.labelreport)
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId("reportaccounttext")

    const row = new ActionRowBuilder<TextInputBuilder>()
    .setComponents(Text)

    modal.setComponents(row)

    return modal
   
}
export default {ReportModal}