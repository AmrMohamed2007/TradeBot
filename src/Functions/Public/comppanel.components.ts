import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, StringSelectMenuBuilder } from "discord.js"

async function GeneratePanelComp(client: Client, type: String, data, langdata) {
    const AuthorData = {name:data.guild.name,iconURL:data.guild.iconURL()}
    const embed = await client.CreateEmbed({
        title: data.title_comp ? data.title_comp : langdata.comp.panel.title,
        description: data.desc_comp ? data.desc_comp: langdata.comp.panel.description,
        thumbnail:data.thumbnail ? data.thumbnail : null,
        image: data.image ? data.image : null,
        author:AuthorData,
        footer:AuthorData
    })

    const row1 = new ActionRowBuilder()
    .setComponents(
        new StringSelectMenuBuilder()
        .setCustomId("admincomp")
        .setPlaceholder(langdata.comp.panel.placeholder)
        .setOptions(
            {label:"Run",value:"run",emoji:client.config.emojis.comp[data.running]},
            {label:"Pause",value:"pause",emoji:client.config.emojis.comp[data.paused]},
            {label:"Resume",value:"resume",emoji:client.config.emojis.comp[data.resumed]},
            {label:"End",value:"end",emoji:client.config.emojis.comp[data.end]},
            {label:"Delete",value:"delete",emoji:client.config.emojis.comp[data.delete]},
        )
    )

    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setDisabled(true)
        .setStyle(data.compstatus == "running" || data.compstatus == "resumed" ? ButtonStyle.Success : ButtonStyle.Danger)
        .setEmoji(client.config.emojis.comp[data.compstatus])
        .setLabel(`${langdata.comp.panel.status}: ${data.compstatus}`)
        .setCustomId("statusbtn"),
        
        new ButtonBuilder()
        .setCustomId(`join_${type}`)
        .setStyle(ButtonStyle.Success)
        .setEmoji(client.config.emojis.true),
        
        new ButtonBuilder()
        .setCustomId(`leave`)
        .setStyle(ButtonStyle.Danger)
        .setEmoji(client.config.emojis.false),
        
        )

    return {embed,row,row1};
}

export default { GeneratePanelComp }
