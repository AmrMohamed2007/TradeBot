import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

async function ModalCreateAcc(type: "nopassword" | "password",langdata: any) {
    const Modal = new ModalBuilder()
    .setCustomId(`createAccountmodal_${type}`)
    .setTitle(langdata.components.createAccount.modaltitle)
    
    const textGmail = new TextInputBuilder()
    .setCustomId("textgmail")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setMinLength(6)
    .setLabel(langdata.components.createAccount.textGmail)
    

    const textFirstName = new TextInputBuilder()
    .setCustomId("textfirstname")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setLabel(langdata.components.createAccount.firstNameText)
    

    const textLastName = new TextInputBuilder()
    .setCustomId("textlastname")
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setMinLength(2)
    .setLabel(langdata.components.createAccount.lastNameText)
    

    
    const password = new TextInputBuilder()
        .setCustomId(`transfertmodalpassword`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.captcha.passwordmodal}`)
        



    const row = new ActionRowBuilder<TextInputBuilder>().setComponents(textGmail)
    const row1 = new ActionRowBuilder<TextInputBuilder>().setComponents(textFirstName)
    const row2 = new ActionRowBuilder<TextInputBuilder>().setComponents(textLastName)
    const row3 = new ActionRowBuilder<TextInputBuilder>().setComponents(password)
    if(type == "nopassword") {
        Modal.setComponents(row,row1,row2)
    }
    if(type == "password") {
        Modal.setComponents(row3,row,row1,row2)

    }
    
  
  
  
    return Modal;
    
}

export default {  ModalCreateAcc }