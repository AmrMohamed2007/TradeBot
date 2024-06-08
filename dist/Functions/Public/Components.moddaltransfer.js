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
function ReturnModalTransferT(langdata) {
    return __awaiter(this, void 0, void 0, function* () {
        const Row = new discord_js_1.ActionRowBuilder();
        const Row1 = new discord_js_1.ActionRowBuilder();
        const Row2 = new discord_js_1.ActionRowBuilder();
        const Row3 = new discord_js_1.ActionRowBuilder();
        const user = new discord_js_1.TextInputBuilder()
            .setCustomId(`transfertmodaluser`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.private.transferterrauser}`);
        const amount = new discord_js_1.TextInputBuilder()
            .setCustomId(`transfertmodalamount`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setPlaceholder("k = 1000 | h = 100 | m = 1000000 etc..")
            .setLabel(`${langdata.private.transferterraamount}`);
        const reason = new discord_js_1.TextInputBuilder()
            .setCustomId(`transfertmodalreason`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setLabel(`${langdata.private.transferterrareason}`);
        const password = new discord_js_1.TextInputBuilder()
            .setCustomId(`transfertmodalpassword`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.captcha.passwordmodal}`);
        Row.setComponents(password);
        Row1.setComponents(user);
        Row2.setComponents(amount);
        Row3.setComponents(reason);
        const Modal = new discord_js_1.ModalBuilder()
            .setTitle(`${langdata.captcha.transferterramodal}`)
            .setCustomId(`transfertmodal`)
            .addComponents(Row, Row1, Row2, Row3);
        return Modal;
    });
}
exports.default = { ReturnModalTransferT };
