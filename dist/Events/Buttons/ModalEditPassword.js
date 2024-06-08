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
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.isModalSubmit() && interaction.customId.startsWith("setupdata_")) {
            const type = interaction.customId.split("_")[1];
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const lastpassword = type == "last" ? interaction.fields.getTextInputValue("lastpassword") : null;
            const newpassword = interaction.fields.getTextInputValue("newpassword") || null;
            const confirmpassword = interaction.fields.getTextInputValue("confirmpassword") || null;
            if (newpassword !== confirmpassword) {
                return yield interaction.reply({ content: `${langdata.errorr.passworderror}` });
            }
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (type == "new") {
                    res.password = `${newpassword}`;
                    res.save();
                    yield interaction.reply({ content: `${client.config.emojis.true} ${langdata.private.passworddoneset}` });
                }
                else {
                    if (`${lastpassword}` !== `${res.password}`)
                        return yield interaction.reply({ content: `${client.config.emojis.false} ${langdata.errorr.passworderror}`, ephemeral: false });
                    res.password = `${newpassword}`;
                    res.save();
                    yield interaction.reply({ content: `${client.config.emojis.true} ${langdata.private.passworddoneset}` });
                }
            }));
        }
    })
};
exports.default = Event;
