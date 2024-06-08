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
    name: "securedUpdate",
    once: false,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            if (res && !res.verified) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`,
                    color: client.config.wrongcolor,
                });
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
            if (res && res.blacklisted.bool) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                });
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
            else if (res && res.scummer.bool) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                });
                interaction.reply({ embeds: [embed], ephemeral: true });
            }
            else {
                const toggleStatus = res.secured ? false : true;
                res.secured = toggleStatus;
                yield res.save();
                yield interaction.reply({ content: `${client.config.emojis.true} ${toggleStatus ? langdata.privatemode.enabled : langdata.privatemode.disabled}` });
            }
        })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}` });
        }));
    })
};
exports.default = Event;
