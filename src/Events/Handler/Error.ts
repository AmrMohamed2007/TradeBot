import { Client ,TextChannel} from "discord.js"



const Event = {
    name: "error",
    once: false,
    run: async (client: Client, err: Error) => {
        console.log(err.message);
        const embed = await client.WrongEmbed({ title: "Error", description: `${err.message}`, color: client.config.wrongcolor })
        const ch = await client.channels.cache.get(client.channelreport) as TextChannel
        if(!ch) return;
        ch.send({ embeds: [embed] })

    }
}

export default Event;