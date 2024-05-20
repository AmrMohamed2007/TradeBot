import fs from "fs"
import chalk from "chalk"
import { Client } from "discord.js";


async function LoadComamnds(client:Client) {
    try {
        
 
    fs.readdirSync(`${process.cwd()}/dist/Commands/`).forEach(async (dir) => {
        const files = fs.readdirSync(`${process.cwd()}/dist/Commands/${dir}/`).filter((m) => m.endsWith(".js") || m.endsWith(".ts"))
            if(!files || files.length == 0)
             return;
            
        for (const file of files) {
            const CommandData = require(`${process.cwd()}/dist/Commands/${dir}/${file}`)?.default
            
            if(CommandData && CommandData.name) {
              
                
                client.commands.set(CommandData.name,CommandData);
                if(CommandData.aliases && Array.isArray(CommandData.aliases)) {
                    CommandData.aliases.forEach((alis:string) => {
                        client.aliases.set(alis,CommandData.name);
                    })
                }
            }else {
                continue;
            }
        }
    })

    console.log(chalk.green(`[BOT] - Commands Loaded`));


} catch (error) {
    console.log(chalk.red(`[BOT ERROR] - ${error.message}`));

}
}

export default LoadComamnds