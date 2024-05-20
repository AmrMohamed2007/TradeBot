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
                { name: "0.0.1-beta", type: ActivityType.Playing },
            ]

        })



    }
}

export default ReadyEvent;