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
const terra = {
    name: "terra",
    description: "show your book of terra",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "balance",
            description: "show your balance of terra",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "user", description: "show book of terra for user", type: 6, required: false }
            ],
        },
        {
            name: "transfer",
            description: "transfer terra to user",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "give",
            description: "give terra to user",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
        {
            name: "remove",
            description: "remove terra from user",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
        {
            name: "givecard",
            description: "give terra to user",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
        {
            name: "removecard",
            description: "remove terra from user",
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                { name: "userid", description: "type userid", required: true, type: 3 },
                { name: "count", description: "count of terra", required: true, type: 10 }
            ]
        },
    ],
    cooldown: 10000,
    databaseActions: ["blacklist", "scummer"],
    botPerms: ["AddReactions", "SendMessages"],
    run: (client, message, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const sub = message.options.getSubcommand();
        const args = message.options.get("user") ? (_a = message.options.get("user")) === null || _a === void 0 ? void 0 : _a.user : message.user;
        function ReturnData(user) {
            return __awaiter(this, void 0, void 0, function* () {
                yield client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    const embed = yield client.CreateEmbed({
                        title: langdata.private.titleuser, fields: [
                            { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                            { value: `${user.id == message.user.id ? res.coins : res.secured ? `${client.config.emojis.passwordver.repeat(4)}` : res.coins}`, name: `${langdata.private.coins}`, inline: true },
                        ],
                        color: client.config.maincolor,
                    });
                    message.reply({ embeds: [embed], ephemeral: true });
                })).catch((err) => __awaiter(this, void 0, void 0, function* () {
                    yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}` });
                }));
            });
        }
        if (sub == "balance") {
            if (args) {
                var user = args;
                if (user.bot)
                    return;
                yield ReturnData(user);
            }
        }
        if (sub == "transfer") {
            yield client.captcha.CaptchaShape(client, message, langdata, "reply", false, "terraTransfer");
        }
        if (sub == "give") {
            if (!client.config.owners.includes(message.user.id))
                return;
            const userid = message.options.getString("userid");
            const count = message.options.getNumber("count");
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                res.coins = res.coins + count;
                yield res.save();
                yield message.reply({ content: `**Done Added to ${message.user.id}\nCount : ${count == 0 || count > res.coins ? "all" : count}**`, ephemeral: true });
            })).catch((err) => {
                message.reply({ content: "User doesn't have a account", ephemeral: true });
            });
        }
        if (sub == "remove") {
            if (!client.config.owners.includes(message.user.id))
                return;
            const userid = message.options.getString("userid");
            const count = message.options.getNumber("count");
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                res.coins = res.coins < count || count == 0 ? 0 : res.coins - count;
                yield res.save();
                yield message.reply({ content: `**Done Removed from ${message.user.id}\nCount : ${count == 0 || count > res.coins ? "all" : count}**`, ephemeral: true });
            })).catch((err) => {
                message.reply({ content: "User doesn't have a account", ephemeral: true });
            });
        }
        if (sub == "givecard") {
            if (!client.config.owners.includes(message.user.id))
                return;
            const userid = message.options.getString("userid");
            const count = message.options.getNumber("count");
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.card.cardNumber)
                    return yield message.reply({ content: langdata.card.errorhavecard, ephemeral: true });
                res.card.coins = res.card.coins + count;
                yield res.save();
                yield message.reply({ content: `**Done add to ${message.user.id}\nCount : ${count}**`, ephemeral: true });
            })).catch((err) => {
                message.reply({ content: "User doesn't have a account", ephemeral: true });
            });
        }
        if (sub == "removecard") {
            if (!client.config.owners.includes(message.user.id))
                return;
            const userid = message.options.getString("userid");
            const count = message.options.getNumber("count");
            client.functions.get.GetUser(client.schema, { status: "one", key: "userid", value: userid })
                .then((res) => __awaiter(void 0, void 0, void 0, function* () {
                if (!res.card.cardNumber)
                    return yield message.reply({ content: langdata.card.errorhavecard, ephemeral: true });
                res.card.coins = res.card.coins < count || count == 0 ? 0 : res.card.coins - count;
                yield res.save();
                yield message.reply({ content: `**Done Removed from ${message.user.id}\nCount : ${count == 0 || count > res.card.coins ? "all" : count}**`, ephemeral: true });
            })).catch((err) => {
                message.reply({ content: "User doesn't have a account", ephemeral: true });
            });
        }
    })
};
exports.default = terra;
