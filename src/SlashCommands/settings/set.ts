import { ApplicationCommandOptionType, ApplicationCommandType ,Client,CommandInteraction} from "discord.js"
const LanguageCommaned = {
    name:"set",
    description:"Setup the bot with command",
    type:ApplicationCommandType.ChatInput,
    options:[
        {
            name:"language",
            description:"Setup guild's language",
            type:ApplicationCommandOptionType.Subcommand,
            options:[]
        },
     
  
    ],
    userPerms:["Administrator"],
    cooldown:20000,
    run:async (client:Client,interaction:any,langdata:any) => {
        const subcommand = interaction.options.getSubcommand()

        if(subcommand == "language") {
            client.emit("languageUpdate",interaction,langdata)
        }
      
      


    }
}

export default LanguageCommaned;