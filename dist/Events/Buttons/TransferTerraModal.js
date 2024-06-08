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
const Event = {
    name: "interactionCreate",
    once: false,
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isModalSubmit() && interaction.customId == "transfertmodal") {
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const password = interaction.fields.getTextInputValue("transfertmodalpassword");
            const user = interaction.fields.getTextInputValue("transfertmodaluser");
            const amount = interaction.fields.getTextInputValue("transfertmodalamount");
            const reason = interaction.fields.getTextInputValue("transfertmodalreason");
            if (user == interaction.user.id)
                return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.error}`, ephemeral: true });
            const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, description: `> ${client.config.emojis.loading} ${langdata.captcha.waiting}`, thing: "Processing.." })], ephemeral: true });
            yield client.functions.get.GetUser(client.schema, { status: "all" }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const MainUser = res.find((m) => m.userid == interaction.user.id);
                    const SecondUser = res.find((m) => m.userid == user);
                    if (!MainUser.password)
                        return yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.captcha.nopassword}` });
                    if (!SecondUser)
                        return yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.captcha.usershouldhaveacc}` });
                    if (String(MainUser.password) !== String(password))
                        return yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.captcha.errorpassword}` });
                    const TransferdAmount = yield client.public.ConvertAmount(String(amount));
                    if (MainUser.coins < TransferdAmount)
                        return yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.captcha.errorcoinsenough}` });
                    if (MainUser.blacklisted.bool || MainUser.scummer.bool) {
                        return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.private.blacklistedmsg}` });
                    }
                    if (SecondUser.blacklisted.bool || SecondUser.scummer.bool) {
                        return yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}` });
                    }
                    const data = {
                        msg: reason,
                        userr: SecondUser.userid,
                        usert: MainUser.userid,
                        amount: +TransferdAmount,
                        typelog: client.types.TransferTerra,
                        guildid: interaction.guildId
                    };
                    yield client.Log.LogFatoraUser(data, langdata);
                    MainUser.coins = MainUser.coins - TransferdAmount;
                    SecondUser.coins = SecondUser.coins + TransferdAmount;
                    yield MainUser.log.push(data);
                    yield SecondUser.log.push(data);
                    yield MainUser.save();
                    yield SecondUser.save();
                    yield Msg.edit({ content: `${client.config.emojis.true} ${langdata.private.donetransfer}`, embeds: [] });
                    yield interaction.channel.send({ content: `${langdata.private.donetransfersend
                            .replace("[userr]", `${SecondUser.userid}`)
                            .replace("[usert]", `${MainUser.userid}`)
                            .replace("[amount]", `${TransferdAmount}`)
                            .replace("[emoji]", `${client.config.emojis.true}`)}`
                    });
                }
                catch (error) {
                    yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}\n\`\`\`${error.message}\`\`\``, embeds: [] });
                }
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}`, embeds: [] });
            }));
        }
    })
};
exports.default = Event;
