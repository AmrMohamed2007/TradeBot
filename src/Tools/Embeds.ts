import { EmbedBuilder } from "discord.js";


export async function CreateEmbd(data) {
    var Embed = new EmbedBuilder()
    Embed.setTitle(data.title ? data.title : null);
    Embed.setDescription(data.description ? data.description : null)
    Embed.setColor(data.color ? data.color : data.maincolor)
    Embed.setTimestamp()
    if (data.author) {
        Embed.setAuthor({ name: data.author.name, iconURL: data.author.iconURL })
    }
    if (data.footer) {
        Embed.setFooter({ text: data.footer.name, iconURL: data.footer.iconURL })
    }
    if (data.fields) {
        Embed.setFields(...data.fields)
    }

    return Embed;


}


// Lang{error[lang]},title,type,permission
export async function WrongEmbed(data) {
    var Embed = new EmbedBuilder()
    Embed.setTitle(data.title ? data.title : null);
    Embed.setDescription(data.description.replace("<permission>", data.permission))
    Embed.setColor("Red")
    Embed.setTimestamp()

    return Embed;


}




export async function WaitingEmbed(data) {
    var Embed = new EmbedBuilder()
    Embed.setDescription(data.description.replace("<thing>", data.thing))
    Embed.setColor(data.color)

    return Embed;
}


