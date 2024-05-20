import { Client, Message } from "discord.js";

const Ping = {
    name: "ping",
    run: async (client: Client, message: Message, args: any, langdata: any) => {


        await message.reply({ content: `${langdata.ping.message.replace("[ping]", `${client.ws.ping}`)}` })
    }
}

export default Ping;