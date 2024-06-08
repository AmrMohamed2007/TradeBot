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
function SetupModaldata(langdata, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const Row = new discord_js_1.ActionRowBuilder();
        const Row1 = new discord_js_1.ActionRowBuilder();
        const Row2 = new discord_js_1.ActionRowBuilder();
        const lastpassword = new discord_js_1.TextInputBuilder()
            .setCustomId(`lastpassword`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setMinLength(8)
            .setMaxLength(16)
            .setLabel(`${langdata.private.lastpasswordtext}`);
        const newpassword = new discord_js_1.TextInputBuilder()
            .setCustomId(`newpassword`)
            .setRequired(true)
            .setMinLength(8)
            .setMaxLength(16)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.private.newpassword}`);
        const confirmpassword = new discord_js_1.TextInputBuilder()
            .setCustomId(`confirmpassword`)
            .setRequired(true)
            .setMinLength(8)
            .setMaxLength(16)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.private.cofirmpassword}`);
        if (type == "new") {
            Row1.setComponents(newpassword);
            Row2.setComponents(confirmpassword);
            const Modal = new discord_js_1.ModalBuilder()
                .setTitle(`${langdata.private.modaltitlepasswordedit}`)
                .setCustomId(`setupdata_${type}`)
                .addComponents(Row1, Row2);
            return Modal;
        }
        else {
            Row1.setComponents(newpassword);
            Row2.setComponents(confirmpassword);
            Row.setComponents(lastpassword);
            const Modal = new discord_js_1.ModalBuilder()
                .setTitle(`${langdata.private.modaltitlepasswordedit}`)
                .setCustomId(`setupdata_${type}`)
                .addComponents(Row, Row1, Row2);
            return Modal;
        }
    });
}
exports.default = { SetupModaldata };
