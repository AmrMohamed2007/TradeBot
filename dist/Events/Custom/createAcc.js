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
    name: "createAccount",
    once: false,
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const Msg = yield interaction.reply({ embeds: [yield client.waitembed({ color: client.config.wrongcolor, thing: "processing...", description: `${client.config.emojis.loading} ${langdata.captcha.waiting}` })], ephemeral: true });
        const accountCreationDate = interaction.user.createdAt;
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        if (accountCreationDate > oneMonthAgo) {
            yield Msg.edit({ content: `${client.config.emojis.false} ${langdata.error}\n\`\`\`Your Account Less than 1 month\`\`\``, embeds: [] });
        }
        else {
            yield client.functions.create.CreateUser(client.schema, { key: "userid", value: interaction.user.id }).then((res) => __awaiter(void 0, void 0, void 0, function* () {
                res.verified = true;
                yield res.save();
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.true} ${langdata.private.createdacc}`,
                    color: client.config.maincolor,
                });
                yield Msg.edit({ embeds: [embed] });
            })).catch((err) => __awaiter(void 0, void 0, void 0, function* () {
                const embed = yield client.CreateEmbed({
                    description: `${client.config.emojis.false} ${langdata.private.errorhaveacc}`,
                    color: client.config.wrongcolor,
                });
                yield Msg.edit({ embeds: [embed] });
            }));
        }
    })
};
exports.default = Event;
