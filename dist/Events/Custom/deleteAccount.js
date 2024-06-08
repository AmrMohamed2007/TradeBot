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
    name: "deleteAccount",
    once: false,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${langdata.captcha.waiting}` })], ephemeral: true });
        yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            if (res && res.blacklisted.bool) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                });
                Msg.edit({ embeds: [embed], ephemeral: true });
            }
            else if (res && res.scummer.bool) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.error}`,
                    color: client.config.wrongcolor,
                });
                Msg.edit({ embeds: [embed], ephemeral: true });
            }
            else {
                yield client.schema.deleteOne({ userid: interaction.user.id });
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.true} ${langdata.private.donedelete}`,
                    color: client.config.maincolor,
                });
                Msg.edit({ embeds: [embed], ephemeral: true });
            }
        })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(err);
            const embed = yield client.CreateEmbed({
                description: `${client.config.emojis.false} ${langdata.captcha[err.message]}`,
                color: client.config.wrongcolor,
            });
            Msg.edit({ embeds: [embed], ephemeral: true });
        }));
    })
};
function setDaily(res, NumberOfCoins) {
    return __awaiter(this, void 0, void 0, function* () {
        res.coins = res.coins + NumberOfCoins;
        res.daily = { taken: true, takenAt: Date.now() };
        yield res.save();
    });
}
exports.default = Event;
