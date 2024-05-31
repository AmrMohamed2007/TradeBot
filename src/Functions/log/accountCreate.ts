import { Client } from "discord.js";

async function AccountCreateLog(client: Client, res1, data) {

    res1.log.push({
        msg: data.msg,
        time: Date.now(),
        guildid: data.guildid,
        typelog: client.types.CreateAccount
    });

   

    await res1.save();
    await client.Log.LogCustomLog({
        title: "New Account Created",
        fields: [
            { name: "User Id", value: `${data.userid}`, inline: false },
            { name: "Guild Id", value: `${data.guildid}`, inline: false }

        ]
    })




    return true;


}

export default { AccountCreateLog };