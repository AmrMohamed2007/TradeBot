import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events, Guild,ChannelType, TextChannel } from "discord.js"
const GuildCreate = {
    name: Events.GuildDelete,
    once: false,
    run: async (client: Client, guild: Guild) => {
        var AuthorData = { name: guild.name, iconURL: guild.iconURL() }
        const row = new ActionRowBuilder<ButtonBuilder>()

        const Button2 = new ButtonBuilder()
            .setCustomId(`blacklist_server_${guild.id}`)
            .setStyle(ButtonStyle.Primary)
            .setLabel("Blacklist Server")

        row.setComponents(Button2)

     
      
        await client.Log.LogLeftServer(
            {
                title: "Left Server",
                fields: [
                    { name: "Guild Name", value: guild.name, inline: false },
                    { name: "Guild Id", value: guild.id, inline: false },
                    { name: "Guild MembersCount", value: `${guild.memberCount}`, inline: false },
                    { name: "Guild Boosts", value: `${guild.premiumSubscriptionCount}`, inline: false },
                    { name: "Guild CreatedAt", value: `${guild.createdAt}`, inline: false },

                ],
                color: client.config.maincolor,
                author: AuthorData,
                footer: AuthorData,
                row
            })
    }
}

export default GuildCreate;