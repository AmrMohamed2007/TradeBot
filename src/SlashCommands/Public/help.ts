import { ApplicationCommandType ,CommandInteraction} from "discord.js"
const Ping = {
    name:"help",
    description:"Comamnd for show all commands",
    type:ApplicationCommandType.ChatInput,
    run:async (client:any,interaction:CommandInteraction,langdata:any) => {
        
    }
}

export default Ping;