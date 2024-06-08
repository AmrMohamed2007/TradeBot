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
const discord_js_1 = require("discord.js");
const Event = {
    name: "premiumBuy",
    once: false,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true });
        yield client.functions.get.GetUser(client.schema, { key: "userid", value: interaction.user.id, status: "one" }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            if (res.blacklisted.bool || res.scummer.bool)
                return yield Msg.edit({ content: `${langdata.error}`, embeds: [] });
            if (res && !res.verified) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`,
                    color: client.config.wrongcolor,
                });
                return yield interaction.reply({ embeds: [embed], ephemeral: true });
            }
            if (res.premium.bool)
                yield Msg.edit({ content: `${langdata.premium.errorhavepremium}`, embeds: [] });
            const Data = { name: interaction.guild.name, iconURL: interaction.guild.iconURL() };
            const embed = yield client.CreateEmbed({
                title: `${langdata.premium.titlebuy}`,
                description: "**25% Sale for Premium Users**",
                fields: [
                    { name: `${langdata.premium.month}`, value: `${client.config.time[0].price} Terra(s)\n2.99$`, inline: true },
                    { name: `${langdata.premium.year}`, value: `${client.config.time[1].price} Terra(s)\n19.99$`, inline: true },
                ],
                author: Data,
                footer: Data,
                color: client.config.maincolor
            });
            const row = new discord_js_1.ActionRowBuilder();
            const btn1 = new discord_js_1.ButtonBuilder()
                .setCustomId("premiumbuy_1")
                .setStyle(discord_js_1.ButtonStyle.Secondary)
                .setLabel(`${langdata.premium.month}`)
                .setEmoji(client.config.emojis.logo);
            const btn2 = new discord_js_1.ButtonBuilder()
                .setCustomId("premiumbuy_12")
                .setStyle(discord_js_1.ButtonStyle.Success)
                .setLabel(`${langdata.premium.year}`)
                .setEmoji(client.config.emojis.logo);
            row.setComponents(btn1, btn2);
            yield Msg.edit({ embeds: [embed], components: [row] });
            const collecter = interaction.channel.createMessageComponentCollector({ filter: u => u.user.id == interaction.user.id, max: 1, time: 16000 });
            collecter.on("collect", (col) => __awaiter(void 0, void 0, void 0, function* () {
                const TypeTrail = +col.customId.split("_")[1] * 30;
                const price = client.config.time.find((m) => m.time == col.customId.split("_")[1]).price;
                const fullprice = price - (Math.floor((price * 25) / 100));
                if (res.premium.subscribed) {
                    if (res.coins < fullprice)
                        return yield col.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errorcoinsenough}`, ephemeral: true });
                    res.coins = res.coins - fullprice;
                    res.premium.subscribed = true;
                    res.premium.days = res.premium.days + TypeTrail;
                    yield res.save();
                    yield col.reply({ content: `${langdata.done.replace("[emoji]", client.config.emojis.true)}`, ephemeral: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield Msg.delete();
                    }));
                    yield client.Log.LogPremiumUser({
                        user: res.userid,
                        code: res.premium.code,
                        days: TypeTrail,
                    }, langdata, client);
                }
                else {
                    if (res.coins < price)
                        return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errorcoinsenough}`, ephemeral: true });
                    res.coins = res.coins - price;
                    res.premium.subscribed = true;
                    res.premium.createdAt = Date.now();
                    res.premium.days = TypeTrail;
                    res.premium.code = yield client.public.generateRandomCode();
                    yield res.save();
                    yield col.reply({ content: `${langdata.done.replace("[emoji]", client.config.emojis.true)}`, ephemeral: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
                        yield Msg.delete();
                    }));
                    yield client.Log.LogPremiumUser({
                        user: res.userid,
                        code: res.premium.code,
                        days: TypeTrail,
                    }, langdata, client);
                }
            }));
        })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(err);
            yield Msg.edit({ content: `${langdata.error}`, embeds: [] });
        }));
    })
};
exports.default = Event;
