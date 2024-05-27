import { ActionRowBuilder,ButtonBuilder, ApplicationCommandType ,CommandInteraction, StringSelectMenuBuilder} from "discord.js"
const Ping = {
    name:"help",
    description:"Comamnd for show all commands",
    type:ApplicationCommandType.ChatInput,
    run:async (client:any,interaction:CommandInteraction,langdata:any) => {
        const author = {
            name:interaction.guild.name,
            iconURL:interaction.guild.iconURL()
        }
        const embed = await client.CreateEmbd({
            title:`${langdata.help.title}`,
            description:`${langdata.help.description}`,
            color:client.config.maincolor,
            author,
            footer:author

        })
        const row = new ActionRowBuilder<ButtonBuilder>()
        const rowSelect = new ActionRowBuilder<StringSelectMenuBuilder>()
        const rowSupport = new ActionRowBuilder<ButtonBuilder>()

    }
}

export default Ping;