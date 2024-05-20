import chalk from "chalk"
import { RunHandler } from "./Handler"
import {LoadFunctions} from "./Loader"
import { Client } from "discord.js"
function Login(client: Client, token: string) {

    client.login(token)
        .then(async () => {
            await RunHandler(client)
            await LoadFunctions(client);
            console.log(
                chalk.green("[BOT] - Successfully Started")
            )
        })
        .catch((err) => {
            console.log(
                chalk.red(`[BOT ERROR] - ${err.message}`)
            )
        })

}

async function Disconnect(client: Client) {
    await client.destroy()
}

export  { Login, Disconnect }