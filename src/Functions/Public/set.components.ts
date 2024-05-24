import { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, AnyComponent, AnyComponentBuilder } from "discord.js";

async function SetupModaldata(langdata: any, type: string) {
    const Row = new ActionRowBuilder<TextInputBuilder>()
    const Row1 = new ActionRowBuilder<TextInputBuilder>()
    const Row2 = new ActionRowBuilder<TextInputBuilder>()



    const lastpassword = new TextInputBuilder()
        .setCustomId(`lastpassword`)
        .setRequired(true)
        .setStyle(TextInputStyle.Short)
        .setMinLength(8)
        .setMaxLength(16)
        .setLabel(`${langdata.private.lastpasswordtext}`)

    const newpassword = new TextInputBuilder()
        .setCustomId(`newpassword`)
        .setRequired(true)
        .setMinLength(8)
        .setMaxLength(16)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.private.newpassword}`)





    const confirmpassword = new TextInputBuilder()
        .setCustomId(`confirmpassword`)
        .setRequired(true)
        .setMinLength(8)
        .setMaxLength(16)
        .setStyle(TextInputStyle.Short)
        .setLabel(`${langdata.private.cofirmpassword}`)


    if (type == "new") {
        Row1.setComponents(newpassword);
        Row2.setComponents(confirmpassword);
        const Modal = new ModalBuilder()
        .setTitle(`${langdata.private.modaltitlepasswordedit}`)
        .setCustomId(`setupdata_${type}`)
        .addComponents( Row1, Row2)
        return Modal;
    } else {
        Row1.setComponents(newpassword);
        Row2.setComponents(confirmpassword);
        Row.setComponents(lastpassword);
        const Modal = new ModalBuilder()
        .setTitle(`${langdata.private.modaltitlepasswordedit}`)
        .setCustomId(`setupdata_${type}`)
        .addComponents(Row, Row1, Row2)
        return Modal;
    }



   


   
}

export default { SetupModaldata }