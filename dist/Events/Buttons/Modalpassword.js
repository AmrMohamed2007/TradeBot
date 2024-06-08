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
        if (interaction.isModalSubmit() && interaction.customId.startsWith("modalpassword")) {
            const Fun = interaction.customId.split("_")[1];
            const password = interaction.fields.getTextInputValue("passwordmodal");
            const langdata = yield client.GetLang(client, interaction.guild.id);
            yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                const Checked = yield client.captcha.CaptchaPassword(res.password, password);
                if (Checked) {
                    client.emit(`${Fun}`, interaction, langdata);
                }
                else {
                    interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errorpassword}`, ephemeral: true });
                }
            })).catch((err) => {
                interaction.reply({ content: `${client.config.emojis.false} ${langdata.captcha.errornoacc}`, ephemeral: true });
            });
        }
    })
};
exports.default = Event;
