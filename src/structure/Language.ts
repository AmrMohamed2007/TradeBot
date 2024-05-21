import { Client } from "discord.js"
async function GetLang(client: Client, guildid: string) {
    var lang = client.langdata.get(guildid);


    if (!lang) {




        var res = await client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: guildid, create: true })
        lang = res.lang ? res.lang : "en"


        await res.save()
        client.langdata.set(guildid, lang)
        const LanguageData = require("../Language/language")?.default[lang];


        return LanguageData;


    } else {


        const LanguageData = require("../Language/language")?.default[lang];

        return LanguageData;
    }


}
async function SetLang(client: Client, guildid: string, lang: string) {
    client.langdata.set(guildid, lang);
    await client.functions.set.setp(client.schemas, "guildid", guildid, "lang", lang);
}

export { GetLang, SetLang }