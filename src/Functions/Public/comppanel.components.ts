import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from "discord.js"

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

    const row = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setCustomId(`join_${type}`)
        .setStyle(ButtonStyle.Success)
        .setEmoji(client.config.emojis.true),
        
        new ButtonBuilder()
        .setCustomId(`leave`)
        .setStyle(ButtonStyle.Danger)
        .setEmoji(client.config.emojis.false),
        
        )

    return {embed,row};
}

export default { GeneratePanelComp }
