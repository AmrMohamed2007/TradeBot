import { Client, TextChannel } from "discord.js";

class Log {
    constructor(client:Client) {
        this.client = client
    }
    client:Client
    channellog:string
    channelreport:string
    channeljoin:string
    channelleft:string
    setLog(type:string) {
        this[type] = this.client.config[type]
    }
    getLog(type:string) {
        const channel = this.client.channels.cache.get(this[type]);
        if(!channel) return undefined;
        return channel;
    }

    async LogJoinServer(data:any) {
        const embed = await this.client.CreateEmbed({
            ...data
        })
        if(!this.getLog("channeljoin")) return;
        const channel = await this.getLog("channeljoin") as TextChannel
        
        await channel.send({embeds:[embed],components:[data.row ? data.row : undefined]})
    }

    async LogLeftServer(data:any) {
        const embed = await this.client.CreateEmbed({
            ...data
        })
        if(!this.getLog("channelleft")) return;
        const channel = await this.getLog("channelleft") as TextChannel
        await channel.send({embeds:[embed],components:[data.row ? data.row : undefined]})
    }

    async LogCustomLog(data) {
        const embed = await this.client.CreateEmbed({
            ...data
        })
        if(!this.getLog("channellog")) return;
        const channel = await this.getLog("channellog") as TextChannel
        await channel.send({embeds:[embed],components:[data.row ? data.row : undefined]})
    }
    

}

export {Log}