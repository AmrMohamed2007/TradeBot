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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ms_1 = __importDefault(require("ms"));
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const Event = {
    name: "dailyAccount",
    once: false,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${client.config.emojis.loading} ${langdata.captcha.waiting}` })], ephemeral: true });
        yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
            const NumberOfCoins = !res.premium.bool ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.floor(Math.random() * 5 + 1) * 1.5);
            if (!res.verified) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`,
                    color: client.config.wrongcolor,
                });
                return Msg.edit({ embeds: [embed], ephemeral: true });
            }
            else if (res.blacklisted.bool) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.private.blacklistedmsg}`,
                    color: client.config.wrongcolor,
                });
                return Msg.edit({ embeds: [embed], ephemeral: true });
            }
            else if (res && res.scummer.bool) {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.private.scummermsg}`,
                    color: client.config.wrongcolor,
                });
                return Msg.edit({ embeds: [embed], ephemeral: true });
            }
            else {
                const { daily } = res;
                if (!daily || !daily.taken) {
                    yield setDaily(res, NumberOfCoins);
                    const embed = yield client.CreateEmbed({
                        description: `${client.config.emojis.daily} ${langdata.private.dailytaken.replace("<amount>", NumberOfCoins)}`,
                        color: client.config.maincolor,
                    });
                    return Msg.edit({ embeds: [embed], ephemeral: true });
                }
                else if (daily.taken && (Date.now() - daily.takenAt) >= (0, ms_1.default)("24h")) {
                    yield setDaily(res, NumberOfCoins);
                    const embed = yield client.CreateEmbed({
                        description: `${client.config.emojis.true} ${langdata.private.dailytaken.replace("<amount>", NumberOfCoins)}`,
                        color: client.config.maincolor,
                    });
                    return Msg.edit({ embeds: [embed], ephemeral: true });
                }
                else {
                    const time = yield (0, pretty_ms_1.default)(+Math.floor((0, ms_1.default)("24h") - (Date.now() - daily.takenAt)));
                    const embed = yield client.CreateEmbed({
                        description: `${client.config.emojis.false} ${langdata.private.wait.replace("[time]", `${time}`)}`,
                        color: client.config.wrongcolor,
                    });
                    return Msg.edit({ embeds: [embed], ephemeral: true });
                }
            }
        })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(err);
            const embed = yield client.CreateEmbed({
                description: `${langdata.captcha[err.message]}`,
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
