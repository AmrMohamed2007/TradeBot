import { Client } from "discord.js";

async function Transfer(client: Client, res1, res2, data) {

    res1.log.push({
        msg: data.msg,
        userr: res2.userid,
        usert: res1.userid,
        time: Date.now(),
        guildid: data.guildid,
        amount: data.amount,
        typelog: client.types.TransferTerra
    });

    res2.log.push({
        msg: data.msg,
        userr: res2.userid,
        usert: res1.userid,
        time: Date.now(),
        guildid: data.guildid,
        amount: data.amount,
        typelog: client.types.TransferTerra
    });

    await res1.save();
    await res2.save();

    await client.Log.LogCustomLog({
        title: "New Transcution",
        fields: [
            { name: "User Transferd", value: `${res1.userid}`, inline: false },
            { name: "User Recived", value: `${res2.userid}`, inline: false },

        ]
    })




    return true;


}

export default { Transfer };