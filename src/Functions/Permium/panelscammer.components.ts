import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from "discord.js";

async function SetupScummer(client: Client, type: string, langdata: any, message: any) {
   
    const row = new ActionRowBuilder<ButtonBuilder>()
    const addScummer = new ButtonBuilder()
    .setLabel(langdata.scammer.labeladd)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(client.config.emojis.true)
    .setCustomId(`addscammer_${type}_${message.user.id}`)


    const findScummer = new ButtonBuilder()
    .setLabel(langdata.scammer.findScummer)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(client.config.emojis.warning)
    .setCustomId(`findscammer_${type}_${message.user.id}`)


    const deleteScummer = new ButtonBuilder()
    .setLabel(langdata.scammer.deleteScummer)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(client.config.emojis.false)
    .setCustomId(`deletescammer_${type}_${message.user.id}`)


    row.setComponents(addScummer,findScummer,deleteScummer)

   
   
    if (type == "user") {
        var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() }
        const Embed = await client.CreateEmbed({
            title: langdata.scammer.title,
            description: langdata.scammer.desc,
            author: dataAuthor,
            footer: dataAuthor,
            color:client.config.maincolor
        })
      

        await message.reply({content:`**${langdata.setupdone} ${client.config.emojis.true}**`,ephemeral:true})
        await message.channel.send({ embeds: [Embed], components: [row] })
    }
    if (type == "owner") {
        var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() }
        const Embed = await client.CreateEmbed({
            title: langdata.scammer.title,
            description: langdata.scammer.desc,
            author: dataAuthor,
            footer: dataAuthor,
            image:client.config.info.scammers,
            color:client.config.maincolor,
        })
        await message.reply({content:`**${langdata.setupdone} ${client.config.emojis.true}**`,ephemeral:true})
        await message.channel.send({ embeds: [Embed], components: [row]})
 
    }

}

export default { SetupScummer }