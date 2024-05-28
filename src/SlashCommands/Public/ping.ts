import { ApplicationCommandType ,CommandInteraction} from "discord.js"
const Ping = {
    name:"ping",
    description:"show bot's ping",
    type:ApplicationCommandType.ChatInput,
    run:async (client:any,interaction:CommandInteraction,langdata:any) => {
        await interaction.reply({content:`${langdata.ping.message.replace("[ping]",client.ws.ping)}`})
    }
}

export default Ping;