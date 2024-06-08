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
        if (interaction.isButton() && interaction.customId.startsWith("acc_")) {
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const btntype = interaction.customId.split("_")[1];
            yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (btntype.includes("create")) {
                    return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.components.createAccount.verified}`, embeds: [], ephemeral: true });
                }
                else if (btntype.includes("report") || btntype.includes("transfer")) {
                    if (res.verified) {
                        yield client.captcha.CaptchaShape(client, interaction, langdata, "reply", true, btntype);
                    }
                    else {
                        return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, embeds: [], ephemeral: true });
                    }
                }
                else if (btntype.includes("daily")) {
                    if (res.verified) {
                        yield client.captcha.CaptchaShape(client, interaction, langdata, "reply", false, btntype);
                    }
                    else {
                        return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, embeds: [], ephemeral: true });
                    }
                }
                else {
                    yield client.captcha.CaptchaShape(client, interaction, langdata, "reply", true, btntype);
                }
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                console.log(err);
                if (btntype.includes("create")) {
                    yield client.captcha.CaptchaShape(client, interaction, langdata, "reply", false, btntype);
                }
            }));
        }
    })
};
exports.default = Event;
