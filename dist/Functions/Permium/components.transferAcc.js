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
function TransferModal(langdata) {
    return __awaiter(this, void 0, void 0, function* () {
        const modal = new discord_js_1.ModalBuilder()
            .setTitle(langdata.premium.modaltransfertitle)
            .setCustomId("transferaccountmodal");
        const Text = new discord_js_1.TextInputBuilder()
            .setRequired(true)
            .setLabel(langdata.premium.labeltransfer)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setCustomId("useridtransfermodal");
        const row = new discord_js_1.ActionRowBuilder()
            .setComponents(Text);
        modal.setComponents(row);
        return modal;
    });
}
exports.default = { TransferModal };
