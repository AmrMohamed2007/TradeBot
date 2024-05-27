import { ActionRowBuilder,ButtonBuilder, ApplicationCommandType ,CommandInteraction, StringSelectMenuBuilder, ButtonStyle, Client} from "discord.js"
const Ping = {
    name:"help",
    description:"Comamnd for show all commands",
    type:ApplicationCommandType.ChatInput,
    run:async (client:Client,interaction:CommandInteraction,langdata:any) => {
        const author = {
            name:interaction.guild.name,
            iconURL:interaction.guild.iconURL()
        }
        const embed = await client.CreateEmbed({
            title:`${langdata.help.title}`,
            description:`${langdata.help.description}`,
            color:client.config.maincolor,
            author,
            footer:author

        })
        const row = new ActionRowBuilder<ButtonBuilder>()
        const rowSelect = new ActionRowBuilder<StringSelectMenuBuilder>()
        const rowSupport = new ActionRowBuilder<ButtonBuilder>()
        
        const btn1 = new ButtonBuilder()
        .setLabel("Support")
        .setStyle(ButtonStyle.Link)
        .setURL(client.config.serverURL)
        rowSupport.setComponents(btn1)

        const BankBtn = new ButtonBuilder()
        .setCustomId("bankcommands")
        .setStyle(ButtonStyle.Secondary)


    }
}

export default Ping;