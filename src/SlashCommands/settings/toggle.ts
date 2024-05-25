import { ApplicationCommandOptionType, ApplicationCommandType ,Client,CommandInteraction} from "discord.js"
const LanguageCommaned = {
    name:"toggle",
    description:"Setup the bot with command",
    type:ApplicationCommandType.ChatInput,
    options:[
       
        {
            name:"privateaccount",
            description:"enable/disable private mode",
            type:ApplicationCommandOptionType.Subcommand,
            options:[]
        }
    ],
    cooldown:20000,
    run:async (client:Client,interaction:any,langdata:any) => {
        const subcommand = interaction.options.getSubcommand()

    
        if(subcommand == "privateaccount") {
            client.emit("securedUpdate",interaction,langdata)
        }


    }
}

export default LanguageCommaned;