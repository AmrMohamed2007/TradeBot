"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
class Log {
    constructor(client) {
        this.client = client;
    }
    setLog(type) {
        this[type] = this.client.config[type];
    }
    getLog(type) {
        const channel = this.client.channels.cache.get(this[type]);
        if (!channel)
            return undefined;
        return channel;
    }
    LogJoinServer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = yield this.client.CreateEmbed(Object.assign({}, data));
            if (!this.getLog("channeljoin"))
                return;
            const channel = yield this.getLog("channeljoin");
            yield channel.send({ embeds: [embed], components: [data.row ? data.row : undefined] });
        });
    }
    LogLeftServer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = yield this.client.CreateEmbed(Object.assign({}, data));
            if (!this.getLog("channelleft"))
                return;
            const channel = yield this.getLog("channelleft");
            yield channel.send({ embeds: [embed], components: [data.row ? data.row : undefined] });
        });
    }
    LogCustomLog(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const embed = yield this.client.CreateEmbed(Object.assign({}, data));
            if (!this.getLog("channellog"))
                return;
            const channel = yield this.getLog("channellog");
            yield channel.send({ embeds: [embed], components: [data.row ? data.row : undefined] });
        });
    }
    LogFatoraUser(data, langdata) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const guild = this.client.guilds.cache.get(data.guildid);
            const usert = guild.members.cache.get(data.usert);
            const userr = guild.members.cache.get(data.userr);
            const amount = data.amount;
            const Time = Math.floor(Date.now() / 1000);
            yield ((_a = usert === null || usert === void 0 ? void 0 : usert.send) === null || _a === void 0 ? void 0 : _a.call(usert, {
                content: `${langdata.private.transfer
                    .replace("[giver]", `${data.usert}`)
                    .replace("[receiver]", `${data.userr}`)
                    .replace("[amount]", `${amount}`)
                    .replace("[time]", `<t:${Time}:R>`)
                    .replace("[reason]", `${data.msg}`)
                    .replace("[emoji]", `${this.client.config.emojis.atm}`)
                    .replace("[emoji2]", `${this.client.config.emojis.giveaway}`)}`
            }).catch((err) => {
                err = 0;
            }));
            yield ((_b = userr === null || userr === void 0 ? void 0 : userr.send) === null || _b === void 0 ? void 0 : _b.call(userr, {
                content: `${langdata.private.transfer
                    .replace("[receiver]", `${data.userr}`)
                    .replace("[giver]", `${data.usert}`)
                    .replace("[amount]", `${amount}`)
                    .replace("[time]", `<t:${Time}:R>`)
                    .replace("[reason]", `${data.msg}`)
                    .replace("[emoji]", `${this.client.config.emojis.atm}`)
                    .replace("[emoji2]", `${this.client.config.emojis.giveaway}`)}`
            }).catch((err) => {
                err = 0;
            }));
        });
    }
    LogPremiumUser(data, langdata, client) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const guild = this.client.guilds.cache.get(data.guildid);
            const user = guild.members.cache.get(data.user);
            const code = data.code;
            const days = data.days;
            const Time = Math.floor(data.createdAt / 1000);
            yield ((_a = user === null || user === void 0 ? void 0 : user.send) === null || _a === void 0 ? void 0 : _a.call(user, {
                content: `${langdata.private.premiumBuy
                    .replace("[buyer]", `${user}`)
                    .replace("[days]", `<t:${days}:R>`)
                    .replace("[time]", `<t:${Time}:R>`)
                    .replace("[code]", `${code}`)
                    .replace("[reason]", `${data.reason}`)
                    .replace("[emoji]", `${this.client.config.emojis.premium}`)
                    .replace("[emoji2]", `${this.client.config.emojis.giveaway}`)}`
            }).catch((err) => {
                err = 0;
            }));
            const ch = yield client.channels.cache.get(client.config.channelpremium);
            if (!ch)
                return;
            ch.send({
                embeds: [yield client.CreateEmbed({
                        title: "New Premium Subscription",
                        description: `Code : **${code}**\n
User: ${user}\n
Days: <t:${days}:R>\n
Time: <t:${Time}:R>`,
                        color: client.config.maincolor
                    })]
            });
        });
    }
}
exports.Log = Log;
