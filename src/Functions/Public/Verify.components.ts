import { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder, AnyComponent, AnyComponentBuilder, ButtonBuilder, ButtonStyle, Client } from "discord.js";

async function ButtonVerfy(client:Client,langdata: any) {
    const row = new ActionRowBuilder<ButtonBuilder>()
    .setComponents(
        new ButtonBuilder()
        .setCustomId("verifyemail")
        .setLabel(langdata.components.createAccount.labelverify)
        .setStyle(ButtonStyle.Success)
        .setEmoji(client.config.emojis.passwordver)

    )

    return row;

}

export default {  ButtonVerfy }