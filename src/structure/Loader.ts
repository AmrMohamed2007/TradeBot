import { Client } from "discord.js"
import * as fs from "fs"
import chalk from "chalk"
async function LoadFunctions(client: Client) {
    // Load Database Functions
    fs.readdirSync(`${process.cwd()}/dist/Functions/database/`).filter((m) => m.endsWith(".ts") || m.endsWith(".js")).forEach(async (file) => {
        const ModuleFunction = require(`${process.cwd()}/dist/Functions/database/${file}`)

        const FunctionName = file.includes(".js") ? file.split(".js")[0] : file.split(".tss")[0]
        client.functions[FunctionName] = ModuleFunction;


    })

    // Load Language Functions
    const Functions = require("./Language");
    client.GetLang = Functions.GetLang;
    client.SetLang = Functions.SetLang;
    console.log(chalk.green("[MONGOOSE] All Functions Loaded"));

    // Load Tools Functions
    client.CreateEmbed = require("../Tools/Embeds").CreateEmbd
    client.waitembed = require("../Tools/Embeds").WaitingEmbed
    console.log(chalk.green("[BOT] All UTILS Functions Loaded"));

    // Load CaptchaFunctions
    fs.readdirSync(`${process.cwd()}/dist/Functions/Security/`).forEach((file) => {
        const Functionm = require(`${process.cwd()}/dist/Functions/Security/${file}`)?.default;


        const data = Object.entries(Functionm)
        data.forEach((m) => {
            client.captcha[m[0]] = m[1];
        })
    })
    console.log(chalk.green("[BOT] All Security Functions Loaded"));



    // Load Panel Functions
    fs.readdirSync(`${process.cwd()}/dist/Functions/Permium/`).forEach((file) => {
        const Functionm = require(`${process.cwd()}/dist/Functions/Permium/${file}`)?.default;
        const data = Object.entries(Functionm)
        data.forEach((md) => {
            client.premium[md[0]] = md[1];
        })
    })

    console.log(chalk.green("[BOT] All Premium Functions Loaded"));

    // Load Log
    const {Log} = require("../Tools/Log")
    client.Log = new Log(client)
    // Channels Load
    await client.Log.setLog("channeljoin")
    await client.Log.setLog("channelleft")
    await client.Log.setLog("channellog")
    await client.Log.setLog("channelreport")

    console.log(chalk.green("[BOT] All Log Functions Loaded"));

}
export { LoadFunctions };