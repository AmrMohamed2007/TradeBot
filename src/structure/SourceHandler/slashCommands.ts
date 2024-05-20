import * as fs from "fs"
import chalk from "chalk"
import { REST } from "@discordjs/rest"
import { Client, Routes } from "discord.js"




async function LoadRoutes(token: string, botid: string, slashCommands: any) {

    const rest = new REST({ version: "9" }).setToken(token)

    await rest.put(Routes.applicationCommands(botid), { body: slashCommands })
}

async function LoadSlashCommands(client: Client) {
    const slashCommands = []

    fs.readdirSync(`${process.cwd()}/dist/SlashCommands/`).forEach(async (dir) => {

        const files = fs.readdirSync(`${process.cwd()}/dist/SlashCommands/${dir}/`)
            .filter((m) => m.endsWith(".js") || m.endsWith(".ts"))

            if(!files || files.length == 0)
            return;

        for (const FileName of files) {
            const SlashCommand = require(`${process.cwd()}/dist/SlashCommands/${dir}/${FileName}`)?.default
            
            if (SlashCommand.name) {
                slashCommands.push(SlashCommand)
                client.slashCommands.set(SlashCommand.name, SlashCommand)

            } else {
                continue;
            }


        }





    })
    try {
        await LoadRoutes(client.token, client.user.id, slashCommands);
        console.log(chalk.green(`[BOT] - ${slashCommands.length} Slash Commands Registerd`));
    } catch (error) {
        console.log(chalk.red(`[BOT ERROR] - ${error.message}`));

    }

}

export default LoadSlashCommands;