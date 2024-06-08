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
function CaptchaShape(client, message, langdata, type, typeSecurity, fun, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var userid = "";
        if (message.author) {
            userid = message.author.id;
        }
        else if (message.user) {
            userid = message.user.id;
        }
        else {
            userid = message.interaction.user.id;
        }
        const guildid = message.guild ? message.guild.id : message.interaction.guild.id;
        const RightShape = yield client.captcha.GetShapeLang(client, guildid);
        const rows = yield client.captcha.ReturnShapesC(client, guildid);
        const Msg = type == "reply" ? yield message.reply({ content: `${langdata.captcha.shapetype.replace("[shape]", RightShape.name)}`, components: [...rows], ephemeral: true, embeds: [] }) : yield message.edit({ content: `${langdata.captcha.shapetype.replace("[shape]", RightShape.name)}`, ephemeral: true, components: [...rows], embeds: [] });
        const collecter = type == "reply" ? message.channel.createMessageComponentCollector({ filter: u => u.user.id == userid, max: 1, componentType: discord_js_1.ComponentType.Button, time: 16000 }) : yield Msg.createMessageComponentCollector({ filter: u => u.user.id == userid, max: 1, componentType: discord_js_1.ComponentType.Button, time: 16000 });
        collecter.on("collect", (col) => __awaiter(this, void 0, void 0, function* () {
            const Check = yield client.captcha.VerifyShape(col.customId.split("_")[1], RightShape.emoji);
            if (Check) {
                if (typeSecurity == false) {
                    client.emit(fun, col, langdata, data);
                    type == "reply" ? yield Msg.delete() : yield message.delete();
                }
                else {
                    yield client.captcha.CaptchaReact(client, col, langdata, fun, data);
                    type == "reply" ? yield Msg.delete() : yield message.delete();
                }
            }
            else {
                const embed = yield client.waitembed({ color: client.config.wrongcolor, description: `${client.config.emojis.false} ${langdata.captcha.errorcaptchashape}` });
                type == "reply" ? yield Msg.edit({ embeds: [embed], content: undefined, components: [] }) : yield message.edit({ embeds: [embed], content: undefined, components: [] });
            }
        }));
    });
}
exports.default = { CaptchaShape };
