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
function ModalCreateAcc(type, langdata) {
    return __awaiter(this, void 0, void 0, function* () {
        const Modal = new discord_js_1.ModalBuilder()
            .setCustomId(`createAccountmodal_${type}`)
            .setTitle(langdata.components.createAccount.modaltitle);
        const textGmail = new discord_js_1.TextInputBuilder()
            .setCustomId("textgmail")
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(6)
            .setLabel(langdata.components.createAccount.textGmail);
        const textFirstName = new discord_js_1.TextInputBuilder()
            .setCustomId("textfirstname")
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(2)
            .setLabel(langdata.components.createAccount.firstNameText);
        const textLastName = new discord_js_1.TextInputBuilder()
            .setCustomId("textlastname")
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(2)
            .setLabel(langdata.components.createAccount.lastNameText);
        const password = new discord_js_1.TextInputBuilder()
            .setCustomId(`transfertmodalpassword`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.captcha.passwordmodal}`);
        const row = new discord_js_1.ActionRowBuilder().setComponents(textGmail);
        const row1 = new discord_js_1.ActionRowBuilder().setComponents(textFirstName);
        const row2 = new discord_js_1.ActionRowBuilder().setComponents(textLastName);
        const row3 = new discord_js_1.ActionRowBuilder().setComponents(password);
        if (type == "nopassword") {
            Modal.setComponents(row, row1, row2);
        }
        if (type == "password") {
            Modal.setComponents(row3, row, row1, row2);
        }
        return Modal;
    });
}
exports.default = { ModalCreateAcc };
