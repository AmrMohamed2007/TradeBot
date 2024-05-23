import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from "discord.js";

async function ComponentsPanel(client:Client,type:string,langdata:any,guildid:string) {

    const createAccount = new ButtonBuilder()
    .setCustomId(`acc_createAccount_${type}`)
    .setStyle(ButtonStyle.Success)
    .setLabel(`${langdata.premium.createbtn}`)
    .setEmoji(`${client.config.emojis.true}`)

    const deleteAccount = new ButtonBuilder()
    .setCustomId(`acc_deleteAccount_${type}`)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`${langdata.premium.deletebtn}`)
    .setEmoji(`${client.config.emojis.false}`)

    const dailyAccount = new ButtonBuilder()
    .setCustomId(`acc_dailyAccount_${type}`)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`${langdata.premium.dailybtn}`)
    .setEmoji(`${client.config.emojis.daily}`)
    
    const transferAccount = new ButtonBuilder()
    .setCustomId(`acc_transferAccount_${type}`)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`${langdata.premium.transferbtn}`)
    .setEmoji(`${client.config.emojis.transfer}`)

    const ReportAccount = new ButtonBuilder()
    .setCustomId(`acc_reportAccount_${type}`)
    .setStyle(ButtonStyle.Secondary)
    .setLabel(`${langdata.premium.reportbtn}`)
    .setEmoji(`${client.config.emojis.report}`)

    function arrayRotate(arr) {
        arr =  [deleteAccount,ReportAccount,transferAccount,dailyAccount,createAccount]
        return arr
    }
  
    var ArrayOfButtons = [createAccount,dailyAccount,transferAccount,ReportAccount,deleteAccount]
    
      
    if(type == "user") {
        const lang = client.langdata.get(guildid)
        if(lang == "ar") ArrayOfButtons = await arrayRotate(ArrayOfButtons)
        const row = new ActionRowBuilder()
        .setComponents(
            ArrayOfButtons
        )
        return row;
    }
    if(type == "owner") {
        const lang = client.langdata.get(guildid)
        if(lang == "ar") ArrayOfButtons = await arrayRotate(ArrayOfButtons)
        const row = new ActionRowBuilder()
        .setComponents(
            ArrayOfButtons
        )
        return row;
    }
}
export default {ComponentsPanel}