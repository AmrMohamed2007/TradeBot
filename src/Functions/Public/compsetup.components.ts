import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelSelectMenuBuilder, ChannelType, Client, StringSelectMenuBuilder } from "discord.js"

async function GeneratePanelCompSetup(client: Client,  data, langdata) {
    const AuthorData = {name:data.guild.name,iconURL:data.guild.iconURL()}
    let embedOptions = {
        title:  langdata.comp.setup.title,
        description: langdata.comp.setup.descembed,
        thumbnail:data.thumbnail ? data.thumbnail : null,
        image: data.image ? data.image : null,
        author:AuthorData,
        footer:AuthorData,
        fields:data.fields
    }
    const embed = await client.CreateEmbed(embedOptions);

    const Btns = new ActionRowBuilder()
    .setComponents(
        new ButtonBuilder()
        .setCustomId("title_comp")
        .setLabel(langdata.comp.setup.title)
        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
        .setCustomId("desc_comp")
        .setLabel(langdata.comp.setup.desc)
        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
        .setCustomId("react_comp")
        .setLabel(langdata.comp.setup.react)
        .setStyle(ButtonStyle.Secondary),

        
        new ButtonBuilder()
        .setCustomId("image_comp")
        .setLabel(langdata.comp.setup.image)
        .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
        .setCustomId("thumbnail_comp")
        .setLabel(langdata.comp.setup.thumbnail)
        .setStyle(ButtonStyle.Secondary),
    )
   
   const rowJoin = new ActionRowBuilder()
   .setComponents(
    new ChannelSelectMenuBuilder()
    .addChannelTypes(ChannelType.GuildText)
    .setCustomId("comp_channel_joiners")
    .setMaxValues(1)

   )

   const rowMosabka = new ActionRowBuilder()
   .setComponents(
    new ChannelSelectMenuBuilder()
    .addChannelTypes(ChannelType.GuildText)
    .setCustomId("comp_channel_mosabka")
    .setMaxValues(1)
    
   )

   return {embeds:[embed],components:[Btns,rowJoin,rowMosabka]}


    
}

export default { GeneratePanelCompSetup }
