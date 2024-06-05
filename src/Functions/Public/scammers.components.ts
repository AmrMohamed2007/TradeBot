import { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, AnyComponent, AnyComponentBuilder } from "discord.js";

async function ReturnModalSc(langdata: any,type:string) {
    const Row1 = new ActionRowBuilder<TextInputBuilder>()
    const Row2 = new ActionRowBuilder<TextInputBuilder>()
    const Row3 = new ActionRowBuilder<TextInputBuilder>()
    const Row4 = new ActionRowBuilder<TextInputBuilder>()


    const scammerid = new TextInputBuilder()
        .setCustomId(`scammerid`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.jail.scammeridlabel}`)

    const amount = new TextInputBuilder()
        .setCustomId(`amountscummer`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.jail.amountscummer}`)


    const usert = new TextInputBuilder()
        .setCustomId(`usertid`)
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        .setLabel(`${langdata.jail.usertlabel}`)

        const reason = new TextInputBuilder()
        .setCustomId(`reason`)
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        .setLabel(`${langdata.scammer.reason}`)


        const Modal = new ModalBuilder()


    Row4.setComponents(reason)
    Row1.setComponents(usert);
    Row2.setComponents(amount);
    Row3.setComponents(scammerid);
    if(type == "add") {
        Modal.setTitle(`${langdata.scammer.labeladd}`)
        Modal.setCustomId(`${type}scammermodal`)
        Modal.addComponents(Row1,Row2,Row3,Row4)

    }
    if(type == "delete") {
        Modal.setTitle(`${langdata.scammer.deleteScummer}`)
        Modal.setCustomId(`${type}scammermodal`)
        Modal.addComponents(Row3,Row4)

    }
    if(type == "find") {
        Modal.setTitle(`${langdata.scammer.findScummer}`)
        Modal.setCustomId(`${type}scammermodal`)
        Modal.addComponents(Row3)

    }
  

    return Modal;
}

export default {  ReturnModalSc }