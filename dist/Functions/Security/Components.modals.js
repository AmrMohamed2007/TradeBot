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
function ReturnModalPassword(langdata, fun) {
    return __awaiter(this, void 0, void 0, function* () {
        const Row = new discord_js_1.ActionRowBuilder();
        const text = new discord_js_1.TextInputBuilder()
            .setCustomId(`passwordmodal`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.captcha.passwordmodal}`);
        Row.setComponents(text);
        const Modal = new discord_js_1.ModalBuilder()
            .setTitle(`${langdata.captcha.passwordtitle}`)
            .setCustomId(`modalpassword_${fun}`)
            .addComponents(Row);
        return Modal;
    });
}
exports.default = { ReturnModalPassword };
