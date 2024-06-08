import chalk from "chalk";
import { ActivityType ,Client} from "discord.js"
import ms from 'ms'
const ReadyEvent = {
    name: "ready",
    once: true,
    run: async (client: Client) => {
        console.log(chalk.green(`[BOT] - ${client.user.username} Ready`));
        client.user.setPresence({
            status: "idle",
            activities: [
                { name: "/help", type: ActivityType.Playing },
            ]

        })
     
        // await client.schema.find({}).then((s) => {
        //     s.forEach(async (res) => {
        //         res.email = undefined
        //         res.code = undefined
        //         res.sendAt = undefined
        //         res.verified = true
        //         if(res.premium.subscribed) {
        //             res.premium.createdAt = Date.now()
        //             res.premium.days = ms("365d")
        //         }
        //         await res.save()
              
                
        //     })
        // })
      


    }
}

export default ReadyEvent;