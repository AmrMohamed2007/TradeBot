// import { ActionRowBuilder, ButtonBuilder, ApplicationCommandType, CommandInteraction, StringSelectMenuBuilder, ButtonStyle, Client } from "discord.js"
// const Ping = {
//     name: "help",
//     description: "Comamnd for show all commands",
//     type: ApplicationCommandType.ChatInput,
//     run: async (client: Client, interaction: CommandInteraction, langdata: any) => {
//         const author = {
//             name: interaction.guild.name,
//             iconURL: interaction.guild.iconURL()
//         }
//         const embed = await client.CreateEmbed({
//             title: `${langdata.help.title}`,
//             description: `${langdata.help.description}`,
//             color: client.config.maincolor,
//             author,
//             footer: author,
//             thumbnail: author.iconURL

//         })
//         const row = new ActionRowBuilder<ButtonBuilder>()
//         const rowSelect = new ActionRowBuilder<StringSelectMenuBuilder>()
//         const rowSupport = new ActionRowBuilder<ButtonBuilder>()

//         const btn1 = new ButtonBuilder()
//             .setLabel("Support")
//             .setStyle(ButtonStyle.Link)
//             .setURL(client.config.serverURL)
//             .setEmoji(client.config.emojis.support)
//         rowSupport.setComponents(btn1)

//         const BankBtn = new ButtonBuilder()
//             .setCustomId("bankcommands")
//             .setStyle(ButtonStyle.Success)
//             .setEmoji(client.config.emojis.daily)

//         const GiveawayBtn = new ButtonBuilder()
//             .setCustomId("giveawycommands")
//             .setStyle(ButtonStyle.Secondary)
//             .setEmoji(client.config.emojis.giveaway)

//         const SettingsBtn = new ButtonBuilder()
//             .setCustomId("settingscommands")
//             .setStyle(ButtonStyle.Secondary)
//             .setEmoji(client.config.emojis.settings)

//         row.setComponents(BankBtn, GiveawayBtn, SettingsBtn)

//         const stringSelect = new StringSelectMenuBuilder()
//             .setCustomId("helpselect")
//             .setOptions(...langdata.questions.help)
//             .setPlaceholder(`${langdata.help.placeholderques}`)

//         rowSelect.setComponents(stringSelect)

//         const Msg = await interaction.reply({ embeds: [embed], components: [row, rowSelect, rowSupport] })

//         const collecter = await interaction.channel.createMessageComponentCollector({ filter: u => u.user.id == interaction.user.id, time: 20000 })

//         collecter.on("collect", async col => {
//             if (col.isButton()) {
//                 if (col.customId == "bankcommands") {
//                     const embed = await client.CreateEmbed({
//                         title: `${client.config.emojis.daily} Bank Commands`,
//                         description: `
//                         **/terra balance**: Show your balance of terra
//                        **/terra transfer** : Transfer terra to users
//                        ** /account **: Show your bank account info`,
//                        color:client.config.maincolor,
//                         thumbnail: interaction.guild.iconURL(),
//                         author: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
//                         footer: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
//                     })
//                     await col.deferUpdate()
//                     await Msg.edit({embeds:[embed]});
//                 }
//                 if (col.customId == "giveawycommands") {
//                     const embed = await client.CreateEmbed({
//                         title: `${client.config.emojis.daily} Bank Commands`,
//                         description: `
//                         **/gstart**: Start giveawy or multi giveaways\n
//                        **/gdelete** : Delete giveaway from channel and cancel it\n
//                        **/greroll **: Reroll a giveaway\n
//                        **/gpause** : Puase a giveaway\n
//                        **/gresume** : Resume a giveaway\n
//                        **gend** : End a giveaway`,
//                        color:client.config.maincolor,
//                         thumbnail: interaction.guild.iconURL(),
//                         author: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
//                         footer: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
//                     })
//                     await col.deferUpdate()
//                     await Msg.edit({embeds:[embed]});
//                 }
//                 if (col.customId == "settingscommands") {
//                     const embed = await client.CreateEmbed({
//                         title: `${client.config.emojis.daily} Bank Commands`,
//                         description: `
//                         **/toggle privatemode**: enable/disable private mode makes users dont show your balance\n
//                        **/password set** : set password for your account\n
//                        **/set giveaway**: makes you edit anything in giveaway\n
//                        **/delete image** : delete giveaway's image\n
//                        **/delete thumbnail** : delete giveaway's thumbnail`,
//                        color:client.config.maincolor,
//                         thumbnail: interaction.guild.iconURL(),
//                         author: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
//                         footer: { name: interaction.guild.name, iconURL: interaction.guild.iconURL() },
//                     })
//                     await col.deferUpdate()
//                     await Msg.edit({embeds:[embed]});
//                 }
//             }

//             if (col.isStringSelectMenu()) {
//                 if (col.customId == "helpselect") {
//                     const value = col.values[0];

//                 }
//             }

//         })




//     }
// }

// export default Ping;