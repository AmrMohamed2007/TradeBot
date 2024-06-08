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
function ReturnModalSc(langdata, type) {
    return __awaiter(this, void 0, void 0, function* () {
        const Row1 = new discord_js_1.ActionRowBuilder();
        const Row2 = new discord_js_1.ActionRowBuilder();
        const Row3 = new discord_js_1.ActionRowBuilder();
        const Row4 = new discord_js_1.ActionRowBuilder();
        const scammerid = new discord_js_1.TextInputBuilder()
            .setCustomId(`scammerid`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.jail.scammeridlabel}`);
        const amount = new discord_js_1.TextInputBuilder()
            .setCustomId(`amountscummer`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Short)
            .setLabel(`${langdata.jail.amountscummer}`);
        const usert = new discord_js_1.TextInputBuilder()
            .setCustomId(`usertid`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setLabel(`${langdata.jail.usertlabel}`);
        const reason = new discord_js_1.TextInputBuilder()
            .setCustomId(`reason`)
            .setRequired(true)
            .setStyle(discord_js_1.TextInputStyle.Paragraph)
            .setLabel(`${langdata.scammer.reason}`);
        const Modal = new discord_js_1.ModalBuilder();
        Row4.setComponents(reason);
        Row1.setComponents(usert);
        Row2.setComponents(amount);
        Row3.setComponents(scammerid);
        if (type == "add") {
            Modal.setTitle(`${langdata.scammer.labeladd}`);
            Modal.setCustomId(`${type}scammermodal`);
            Modal.addComponents(Row1, Row2, Row3, Row4);
        }
        if (type == "delete") {
            Modal.setTitle(`${langdata.scammer.deleteScummer}`);
            Modal.setCustomId(`${type}scammermodal`);
            Modal.addComponents(Row3, Row4);
        }
        if (type == "find") {
            Modal.setTitle(`${langdata.scammer.findScummer}`);
            Modal.setCustomId(`${type}scammermodal`);
            Modal.addComponents(Row3);
        }
        return Modal;
    });
}
exports.default = { ReturnModalSc };
