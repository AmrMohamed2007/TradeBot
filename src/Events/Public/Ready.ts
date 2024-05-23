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



    }
}

export default ReadyEvent;