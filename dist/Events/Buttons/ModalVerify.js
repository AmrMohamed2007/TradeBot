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
const Event = {
    name: "interactionCreate",
    once: false,
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isModalSubmit() && interaction.customId == "verifymodalgmail") {
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const code = interaction.fields.getTextInputValue("code");
            const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, description: `**${client.config.emojis.loading} ${langdata.captcha.waiting}**`, thing: "Proccessing.." })], ephemeral: true });
            yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    if (res.verified) {
                        yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.components.createAccount.verified}` });
                    }
                    else {
                        if (String(res.code) == String(code)) {
                            if ((Date.now() - res.sendAt) >= (0, ms_1.default)('1h')) {
                                yield client.schema.deleteOne({ userid: interaction.user.id });
                                yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.components.createAccount.errtime}` });
                            }
                            else {
                                res.verified = true;
                                res.code = undefined;
                                res.sendAt = undefined;
                                yield res.save();
                                yield Msg.edit({ embeds: [], content: `${client.config.emojis.true} ${langdata.private.createdacc}` });
                            }
                        }
                        else {
                            yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.components.createAccount.codeerr}` });
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                    yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}\n\`\`\`${error.message}\`\`\``, embeds: [] });
                }
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}`, embeds: [] });
            }));
        }
    })
};
exports.default = Event;
