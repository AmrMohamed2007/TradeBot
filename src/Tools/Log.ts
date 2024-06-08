import { Client, TextChannel } from "discord.js";

class Log {
    constructor(client: Client) {
        this.client = client
    }
    client: Client
    channellog: string
    channelreport: string
    channeljoin: string
    channelleft: string
    setLog(type: string) {
        this[type] = this.client.config[type]
    }
    getLog(type: string) {
        const channel = this.client.channels.cache.get(this[type]);
        if (!channel) return undefined;
        return channel;
    }

    async LogJoinServer(data: any) {
        const embed = await this.client.CreateEmbed({
            ...data
        })
        if (!this.getLog("channeljoin")) return;
        const channel = await this.getLog("channeljoin") as TextChannel

        await channel.send({ embeds: [embed], components: [data.row ? data.row : undefined] })
    }

    async LogLeftServer(data: any) {
        const embed = await this.client.CreateEmbed({
            ...data
        })
        if (!this.getLog("channelleft")) return;
        const channel = await this.getLog("channelleft") as TextChannel
        await channel.send({ embeds: [embed], components: [data.row ? data.row : undefined] })
    }

    async LogCustomLog(data) {
        const embed = await this.client.CreateEmbed({
            ...data
        })
        if (!this.getLog("channellog")) return;
        const channel = await this.getLog("channellog") as TextChannel
        await channel.send({ embeds: [embed], components: [data.row ? data.row : undefined] })
    }

    async LogFatoraUser(data, langdata) {
        const guild = this.client.guilds.cache.get(data.guildid)
        const usert = guild.members.cache.get(data.usert);
        const userr = guild.members.cache.get(data.userr)
        const amount = data.amount;
        const Time = Math.floor(Date.now() / 1000);


        await usert?.send?.({
            content: `${langdata.private.transfer
                .replace("[giver]", `${data.usert}`)
                .replace("[receiver]", `${data.userr}`)
                .replace("[amount]", `${amount}`)
                .replace("[time]", `<t:${Time}:R>`)
                .replace("[reason]", `${data.msg}`)
                .replace("[emoji]", `${this.client.config.emojis.atm}`)
                .replace("[emoji2]", `${this.client.config.emojis.giveaway}`)
                }`
        }).catch((err) => {
            err = 0
        })


        await userr?.send?.({
            content: `${langdata.private.transfer
                .replace("[receiver]", `${data.userr}`)
                .replace("[giver]", `${data.usert}`)
                .replace("[amount]", `${amount}`)
                .replace("[time]", `<t:${Time}:R>`)
                .replace("[reason]", `${data.msg}`)
                .replace("[emoji]", `${this.client.config.emojis.atm}`)
                .replace("[emoji2]", `${this.client.config.emojis.giveaway}`)
                }`
        }).catch((err) => {
            err = 0
        })

    }

    async LogPremiumUser(data, langdata, client: Client) {
        const guild = this.client.guilds.cache.get(data.guildid)
        const user = guild.members.cache.get(data.user);
        const code = data.code;
        const days = data.days;
        const Time = Math.floor(data.createdAt / 1000);



        await user?.send?.({
            content: `${langdata.private.premiumBuy
                .replace("[buyer]", `${user}`)
                .replace("[days]", `<t:${days}:R>`)
                .replace("[time]", `<t:${Time}:R>`)
                .replace("[code]", `${code}`)
                .replace("[reason]", `${data.reason}`)
                .replace("[emoji]", `${this.client.config.emojis.premium}`)
                .replace("[emoji2]", `${this.client.config.emojis.giveaway}`)
                }`
        }).catch((err) => {
            err = 0
        })
        const ch = await client.channels.cache.get(client.config.channelpremium) as TextChannel;
        if (!ch) return;
        ch.send({
            embeds: [await client.CreateEmbed({
                title: "New Premium Subscription",
                description: `Code : **${code}**\n
User: ${user}\n
Days: <t:${days}:R>\n
Time: <t:${Time}:R>`,
color:client.config.maincolor
            })]
        })









    }

}

export { Log }