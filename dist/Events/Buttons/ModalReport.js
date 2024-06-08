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
        if (interaction.isModalSubmit() && interaction.customId == "reportaccountmodal") {
            const reportmsg = interaction.fields.getTextInputValue("reportaccounttext");
            const channel = client.channels.cache.get(client.config.channelreport);
            const langdata = yield client.GetLang(client, interaction.guild.id);
            const embed = yield client.CreateEmbed({
                title: "New Bug",
                fields: [
                    { name: "~ UserId", value: interaction.user.id, inline: true }
                ],
                description: `${reportmsg}`,
                color: `${client.config.maincolor}`,
            });
            const embed1 = yield client.CreateEmbed({
                color: `${client.config.maincolor}`,
                description: `${langdata.private.donereport}`
            });
            if (channel.type == 0) {
                yield channel.send({ embeds: [embed] });
                yield interaction.reply({ embeds: [embed1], ephemeral: true });
            }
            else
                return;
        }
    })
};
exports.default = Event;
