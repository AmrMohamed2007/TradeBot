import { Client } from "discord.js";

async function SetupPanel(client: Client, type: string, langdata: any, message: any) {
    if (type == "user") {
        var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() }
        const Embed = await client.CreateEmbed({
            title: langdata.premium.titlepanel,
            description: langdata.premium.descpanel,
            author: dataAuthor,
            footer: dataAuthor,
            color:client.config.maincolor,
            thumbnail: message.guild.iconURL()
        })
        const row = await client.premium.ComponentsPanel(client, type, langdata, message.guild.id)
        await message.reply({content:`${langdata.setupdone} ${client.config.emojis.true}`,ephemeral:true})
        await message.channel.send({ embeds: [Embed], components: [row] })
    }
    if (type == "owner") {
        var dataAuthor = { name: message.guild.name, iconURL: message.guild.iconURL() }
        const Embed = await client.CreateEmbed({
            title: langdata.premium.titlepanel,
            description: langdata.premium.descpanel,
            author: dataAuthor,
            footer: dataAuthor,
            color:client.config.maincolor,
            image:client.config.info.panel,
            thumbnail: message.guild.iconURL()
        })
        const row = await client.premium.ComponentsPanel(client, type, langdata, message.guild.id)
        await message.reply({content:`${langdata.setupdone} ${client.config.emojis.true}`,ephemeral:true})
        await message.channel.send({ embeds: [Embed], components: [row]})
 
    }

}

export default { SetupPanel }