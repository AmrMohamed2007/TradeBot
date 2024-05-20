import { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, AnyComponent, AnyComponentBuilder} from "discord.js";

async function ReturnModalPassword(langdata:any,fun:string) {
    const Row = new ActionRowBuilder<TextInputBuilder>()
    const text = new TextInputBuilder()
    .setCustomId(`passwordmodal`)
    .setRequired(true)
    .setStyle(TextInputStyle.Short)
    .setLabel(`${langdata.captcha.passwordmodal}`)
    
    
    Row.setComponents(text);

    const Modal = new ModalBuilder()
    .setTitle(`${langdata.captcha.passwordtitle}`)
    .setCustomId(`modalpassword_${fun}`)
    .addComponents(Row)


    return Modal;
}

export default {ReturnModalPassword}