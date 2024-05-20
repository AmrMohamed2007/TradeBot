import * as fs from "fs"

import chalk from "chalk"
import { Client } from "discord.js";

async function LoadEvents(client:Client){
    try {
        
  
    fs.readdirSync(`${process.cwd()}/dist/Events/`).forEach(async (dir) => {
        const files = await fs.readdirSync(`${process.cwd()}/dist/Events/${dir}/`).filter((m) => m.endsWith(".js") || m.endsWith(".ts"));
        
        if(!files || files.length == 0)
        return;

        for (const file of files) {
            const EventData = require(`${process.cwd()}/dist/Events/${dir}/${file}`)?.default
            if(EventData.once) {
                client.once(EventData.name,(...parm:any) => EventData.run(client,...parm));
            }else {
                client.on(EventData.name,(...parm:any) => EventData.run(client,...parm));

            }
        }

   

        
    })
    console.log(chalk.green(`[BOT] - Events Loaded`));
} catch (error) {
    console.log(chalk.red(`[BOT ERROR] - ${error.message}`));
     
}
    
}

export default LoadEvents;