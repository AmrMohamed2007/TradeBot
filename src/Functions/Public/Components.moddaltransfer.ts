import { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, AnyComponent, AnyComponentBuilder } from "discord.js";

async function ReturnModalTransferT(langdata: any) {
    const Row = new ActionRowBuilder<TextInputBuilder>()
    const Row1 = new ActionRowBuilder<TextInputBuilder>()
    const Row2 = new ActionRowBuilder<TextInputBuilder>()
    const Row3 = new ActionRowBuilder<TextInputBuilder>()


    const user = new TextInputBuilder()
        .setCustomId(`transfertmodaluser`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.private.transferterrauser}`)

    const amount = new TextInputBuilder()
        .setCustomId(`transfertmodalamount`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("k = 1000 | h = 100 | m = 1000000 etc..")
        .setLabel(`${langdata.private.transferterraamount}`)


    const reason = new TextInputBuilder()
        .setCustomId(`transfertmodalreason`)
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        .setLabel(`${langdata.private.transferterrareason}`)


    const password = new TextInputBuilder()
        .setCustomId(`transfertmodalpassword`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.captcha.passwordmodal}`)
        


    Row.setComponents(password);
    Row1.setComponents(user);
    Row2.setComponents(amount);
    Row3.setComponents(reason);
    const Modal = new ModalBuilder()
        .setTitle(`${langdata.captcha.transferterramodal}`)
        .setCustomId(`transfertmodal`)
        .addComponents(Row,Row1,Row2,Row3)


    return Modal;
}

export default {  ReturnModalTransferT }