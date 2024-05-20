import { Client ,ActionRowBuilder,ButtonBuilder,ButtonStyle} from "discord.js";

async function ReturnBtnPassword(client:Client,langdata:any) {
    const Row = new ActionRowBuilder<ButtonBuilder>()
    const btn = new ButtonBuilder()
    .setCustomId(`passwordcheck`)
    .setStyle(ButtonStyle.Primary)
    .setLabel(`${langdata.captcha.passwordbtn}`)
    .setEmoji(`${client.config.emojis.passwordver}`)

    Row.setComponents(btn);

    return Row;
}



export default {ReturnBtnPassword}