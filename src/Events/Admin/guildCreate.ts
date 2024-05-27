import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, Events, Guild,ChannelType, TextChannel } from "discord.js"
const GuildCreate = {
    name: Events.GuildCreate,
    once: false,
    run: async (client: Client, guild: Guild) => {
        await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: guild.id, create: true })
            .then(async (res) => {
                if (res.blacklisted.bool) {
                    await guild.leave();
                } else {
                    var AuthorData = { name: guild.name, iconURL: guild.iconURL() }
                    const row = new ActionRowBuilder<ButtonBuilder>()
                    const button = new ButtonBuilder()
                        .setCustomId(`leave_${guild.id}`)
                        .setStyle(ButtonStyle.Danger)
                        .setLabel("Leave Server")

                    const Button2 = new ButtonBuilder()
                        .setCustomId(`blacklist_server_${guild.id}`)
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("Blacklist Server")

                    row.setComponents(button, Button2)

                    const channel = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).first() as TextChannel;
                    if (!channel) return;
                    const invite = await channel.createInvite();
                 
                  
                    await client.Log.LogJoinServer(
                        {
                            title: "New Server",
                            fields: [
                                { name: "Guild Name", value: guild.name, inline: false },
                                { name: "Guild Id", value: guild.id, inline: false },
                                { name: "Guild MembersCount", value: `${guild.memberCount}`, inline: false },
                                { name: "Guild Boosts", value: `${guild.premiumSubscriptionCount}`, inline: false },
                                { name: "Guild CreatedAt", value: `${guild.createdAt}`, inline: false },
                                { name: "Guild InviteURL", value: `${invite}`, inline: false },

                            ],
                            color: client.config.maincolor,
                            author: AuthorData,
                            footer: AuthorData,
                            row
                        })

                }
            })
    }
}

export default GuildCreate;