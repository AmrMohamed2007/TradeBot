import { ApplicationCommandOptionType, ApplicationCommandType ,Client,CommandInteraction} from "discord.js"
const LanguageCommaned = {
    name:"password",
    description:"Setup the bot with command",
    type:ApplicationCommandType.ChatInput,
    options:[
        {
            name:"set",
            description:"Set password for your account",
            type:ApplicationCommandOptionType.Subcommand,
            options:[]
        },
        // {
        //     name:"forget",
        //     description:"reset password for your account",
        //     type:ApplicationCommandOptionType.Subcommand,
        //     options:[]
        // },
     
     
  
    ],
    cooldown:20000,
    botPerms:["AddReactions","SendMessages"],
    run:async (client:Client,interaction:any,langdata:any) => {
        const subcommand = interaction.options.getSubcommand()

     
        if(subcommand == "set") {
            client.emit("passwordUpdate",interaction,langdata)
        }
        if(subcommand == "forget") {
            client.emit("passwordforget",interaction,langdata)
        }
      


    }
}

export default LanguageCommaned;