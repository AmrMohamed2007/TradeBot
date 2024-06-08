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
        if (interaction.isModalSubmit() && interaction.customId.startsWith("createAccountmodal_")) {
            const type = interaction.customId.split("_")[1];
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const password = type == "password" ? interaction.fields.getTextInputValue("transfertmodalpassword") : null;
            const lastname = interaction.fields.getTextInputValue("textlastname");
            const firstname = interaction.fields.getTextInputValue("textfirstname");
            const gmail = interaction.fields.getTextInputValue("textgmail");
            const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, description: `**${client.config.emojis.loading} ${langdata.captcha.waiting}**`, thing: "Sending.." })], ephemeral: true });
            const accountCreationDate = interaction.user.createdAt;
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            if (accountCreationDate > oneMonthAgo) {
                yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}` });
            }
            else {
                yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id, create: true }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                    if (res.verified) {
                        yield Msg.edit({ embeds: [], content: `${client.config.emojis.false} ${langdata.components.createAccount.verified}` });
                    }
                    else {
                        if (type == "password") {
                            if (res.password !== password) {
                                yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha.errorpassword}` });
                            }
                            else {
                                yield client.captcha.SendMail(client, gmail, langdata, res, { firstname, lastname, gmail }, client.types.CreateNewAccount).then(() => __awaiter(void 0, void 0, void 0, function* () {
                                    yield Msg.edit({ content: `**${client.config.emojis.true} ${langdata.components.createAccount.senddone}**`, embeds: [], components: [yield client.public.ButtonVerfy(client, langdata)] });
                                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                                    yield Msg.edit({ content: `${client.config.emojis.false} ${err}`, embeds: [] });
                                }));
                            }
                        }
                        else {
                            yield client.captcha.SendMail(client, gmail, langdata, res, { firstname, lastname, gmail }, client.types.CreateNewAccount).then(() => __awaiter(void 0, void 0, void 0, function* () {
                                yield Msg.edit({ content: `**${client.config.emojis.true} ${langdata.components.createAccount.senddone}**`, embeds: [], components: [yield client.public.ButtonVerfy(client, langdata)] });
                            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                                yield Msg.edit({ content: `${client.config.emojis.false} ${err}`, embeds: [] });
                            }));
                        }
                    }
                })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                    yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}`, embeds: [] });
                }));
            }
        }
    })
};
exports.default = Event;
