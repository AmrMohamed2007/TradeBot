import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

async function ModalVerifyModal(langdata: any) {
    const Modal = new ModalBuilder()
    .setCustomId(`verifymodalgmail`)
    .setTitle(langdata.components.createAccount.modaltitle)
    
    const code = new TextInputBuilder()
    .setCustomId("code")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setMinLength(5)
    .setLabel(langdata.components.createAccount.code)
    

    


    const row = new ActionRowBuilder<TextInputBuilder>().setComponents(code)
    
    Modal.setComponents(row)
  
  
    return Modal;
    
}

export default {  ModalVerifyModal }