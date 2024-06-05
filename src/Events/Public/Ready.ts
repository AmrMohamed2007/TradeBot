import chalk from "chalk";
import { ActivityType ,Client} from "discord.js"
const ReadyEvent = {
    name: "ready",
    once: true,
    run: async (client: Client) => {
        console.log(chalk.green(`[BOT] - ${client.user.username} Ready`));
        client.user.setPresence({
            status: "online",
            activities: [
                { name: "/help (Beta)", type: ActivityType.Playing },
            ]

        })
     
        // await client.schema.find({}).then((s) => {
        //     s.forEach(async (res) => {
        //         res.email = undefined
        //         res.code = undefined
        //         res.sendAt = undefined
        //         res.verified = false
        //         res.password = undefined
        //         await res.save()
        //         console.log(res.userid);
                
        //     })
        // })
      


    }
}

export default ReadyEvent;