import { Client } from 'discord.js';
import * as fs from 'fs';
async function RunHandler(client: Client) {
    fs.readdirSync(`${process.cwd()}/dist/structure/SourceHandler/`).forEach(async (handler) => {


        var s = require(`${process.cwd()}/dist/structure/SourceHandler/${handler}`)
       
        
        s?.default?.(client)

    })

}
export { RunHandler };