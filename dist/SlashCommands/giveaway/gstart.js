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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const gstart = {
    name: `gstart`,
    description: `Start Giveaway .`,
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: `duration`,
            description: `Enter time of giveaway`,
            type: 3,
            required: true,
        },
        {
            name: `winners`,
            description: `enter count of winners`,
            required: true,
            type: 10,
        },
        {
            name: `prize`,
            description: `enter prize of giveaway`,
            required: true,
            type: 3,
        },
        {
            name: `count`,
            description: `count of giveaways`,
            required: false,
            type: 10,
        },
    ],
    cooldown: 3000,
    botPerms: ["AddReactions", "SendMessages"],
    userPerms: ["ManageGuild"],
    run: (client, interaction, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        const duration = interaction.options.getString(`duration`);
        const winnerCount = interaction.options.getNumber(`winners`);
        const prize = interaction.options.getString(`prize`);
        const count = interaction.options.getNumber(`count`) || 1;
        if (count > 5)
            return interaction.reply({ content: `${langdata.giveaway.counterror}`, ephemeral: true });
        if (!(0, ms_1.default)(duration))
            return interaction.reply({ content: `${langdata.giveaway.timeerror}`, ephemeral: true });
        if ((0, ms_1.default)(duration) > (0, ms_1.default)("20d"))
            return interaction.reply({ content: `${langdata.error}\n\`\`\`Max Days : 20\`\`\``, ephemeral: true });
        const ss = client.giveawaysManager.giveaways.filter((g) => g.guildId === interaction.guild.id);
        const onServer = ss.filter((g) => !g.ended);
        if (onServer.length > 15 || (onServer.length + count) > 15)
            return interaction.reply({ content: `${langdata.giveaway.lengtherror}`, ephemeral: true });
        const Msg = yield interaction.reply({ content: `${langdata.captcha.waiting.replace("<thing>", "Making it")}`, ephemeral: true });
        yield client.functions.get.GetUser(client.schemas, { status: "one", key: "guildid", value: interaction.guild.id, create: true }).then((Database) => __awaiter(void 0, void 0, void 0, function* () {
            yield (Database === null || Database === void 0 ? void 0 : Database.save());
            client.giveawaysManager.options = {
                default: {
                    botsCanWin: false,
                    embedColor: Database.color_start,
                    embedColorEnd: Database.color_end,
                    reaction: Database.reaction
                }
            };
            yield Msg.edit({ content: `${langdata.giveaway.donemaked}`, ephemeral: true });
            for (let i = 0; i < count; i++) {
                yield client.giveawaysManager
                    .start(interaction.channel, {
                    duration: (0, ms_1.default)(duration),
                    winnerCount,
                    prize,
                    image: Database.image,
                    thumbnail: Database.thumbnail,
                    messages: {
                        giveaway: `${langdata.giveaway.giveawaycontent.replace("[emoji]", Database.reaction).replace("[emoji]", Database.reaction)}`,
                        giveawayEnded: `${langdata.giveaway.giveawayEnded.replace("[emoji]", Database.reaction).replace("[emoji]", Database.reaction)}`,
                        title: '{this.prize}',
                        drawing: `${langdata.giveaway.drawing.replace("[emoji]", Database.reaction)}`,
                        dropMessage: `${langdata.giveaway.dropMessage.replace("[emoji]", Database.reaction)}`,
                        inviteToParticipate: `${langdata.giveaway.inviteToParticipate.replace("[emoji]", Database.reaction)}`,
                        winMessage: `${langdata.giveaway.winMessage.replace("[emoji]", Database.reaction)}`,
                        embedFooter: `{this.winnerCount} ${langdata.giveaway.winners}`,
                        noWinner: `${langdata.giveaway.noWinner}`,
                        hostedBy: `${langdata.giveaway.hostedBy}`,
                        winners: `${langdata.giveaway.winners}`,
                        endedAt: `${langdata.giveaway.endedAt}`
                    }
                })
                    .then((data) => {
                })
                    .catch((err) => {
                    err = 0;
                });
            }
        }));
    }),
};
exports.default = gstart;
