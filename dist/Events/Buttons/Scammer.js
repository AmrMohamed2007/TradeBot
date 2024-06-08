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
        const langdata = yield client.GetLang(client, interaction.guild.id);
        if (interaction.customId == "addscammermodal") {
            const scammerid = interaction.fields.getTextInputValue("scammerid");
            const amount = interaction.fields.getTextInputValue("amountscummer");
            const usert = interaction.fields.getTextInputValue("usertid");
            const reason = interaction.fields.getTextInputValue("reason");
            const ch = client.channels.cache.get(client.config.channelscammers);
            if (!ch)
                return;
            yield ch.send({ content: `New Scammer\nScammerId : **${scammerid}**\nAmount : **${amount}**\nUserT : **${usert}**\n${reason}\nFrom : **${interaction.guild.name}**` });
            yield ch.send({ content: `\`\`\`-\`\`\`` });
            yield interaction.reply({ content: `${langdata.done.replace("[emoji]", client.config.emojis.true)}`, ephemeral: true });
        }
        if (interaction.customId == "deletescammermodal") {
            const scammerid = interaction.fields.getTextInputValue("scammerid");
            const reason = interaction.fields.getTextInputValue("reason");
            const ch = client.channels.cache.get(client.config.channelscammers);
            if (!ch)
                return;
            yield ch.send({ content: `Delete Scammer\nScammerId : **${scammerid}**\nReason: ${reason}\nFrom : **${interaction.guild.name}**` });
            yield ch.send({ content: `\`\`\`-\`\`\`` });
            yield interaction.reply({ content: `${langdata.done.replace("[emoji]", client.config.emojis.true)}`, ephemeral: true });
        }
        if (interaction.customId == "findscammermodal") {
            const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.maincolor, description: `${langdata.captcha.waiting}`, thing: "Proccessing.." })], ephemeral: true });
            const scammerid = interaction.fields.getTextInputValue("scammerid");
            yield client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: scammerid }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                const embed = yield client.CreateEmbed({
                    title: langdata.scammer.doneSearch,
                    fields: [
                        { name: `${langdata.private.userid}`, value: `${scammerid}`, inline: true },
                        { name: `${langdata.private.scammerd}`, value: `${res.scummer.bool ? langdata.private.yes : langdata.private.no}`, inline: true }
                    ],
                    color: client.config.maincolor
                });
                yield Msg.edit({ embeds: [embed] });
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                const embed = yield client.CreateEmbed({
                    title: langdata.scammer.doneSearch,
                    fields: [
                        { name: `${langdata.private.userid}`, value: `${scammerid}`, inline: true },
                        { name: `${langdata.private.scammerd}`, value: `${langdata.private.unknown}`, inline: true }
                    ],
                    color: client.config.maincolor
                });
                yield Msg.edit({ embeds: [embed] });
            }));
        }
    })
};
exports.default = Event;
