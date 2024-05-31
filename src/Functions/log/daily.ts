import { Client } from "discord.js";

async function AccountCreateLog(client: Client,  data) {

 
   

 
    await client.Log.LogCustomLog({
        title: "New Daily Taken",
        fields: [
            { name: "User Id", value: `${data.userid}`, inline: false },
            { name: "Guild Id", value: `${data.guildid}`, inline: false }

        ]
    })




    return true;


}

export default { AccountCreateLog };