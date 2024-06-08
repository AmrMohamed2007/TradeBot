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
const Ping = {
    name: "account",
    description: "show your Bank info",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        { name: "user", description: "show bank data for user", type: 6, required: false }
    ],
    cooldown: 10000,
    databaseActions: ["blacklist", "scummer"],
    botPerms: ["AddReactions", "SendMessages"],
    run: (client, message, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const args = message.options.get("user") ? (_a = message.options.get("user")) === null || _a === void 0 ? void 0 : _a.user : message.user;
        function ReturnData(user) {
            return __awaiter(this, void 0, void 0, function* () {
                yield client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    if ((Date.now() - res.premium.createdAt) >= (0, ms_1.default)(`${res.days}`)) {
                        res.premium = undefined;
                        yield res.save();
                    }
                    const embed = yield client.CreateEmbed({
                        title: langdata.private.titleuser, fields: [
                            { value: `${user.id}`, name: `${langdata.private.userid}`, inline: false },
                            { value: user.username, name: `${langdata.private.username}`, inline: false },
                            { value: user.displayName, name: `${langdata.private.displayname}`, inline: false },
                            { value: res.blacklisted && res.blacklisted.bool ? langdata.private.yes : langdata.private.no, name: `${langdata.private.blacklisted}`, inline: false },
                            { value: res.premium && res.premium.subscribed ? langdata.private.yes : langdata.private.no, name: `${langdata.private.premium}`, inline: false },
                            { value: `${new Date(res.createdAt).toDateString()}`, name: `${langdata.private.createdAt}`, inline: false },
                        ],
                        color: client.config.maincolor,
                        author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                        footer: { name: message.guild.name, iconURL: message.guild.iconURL() },
                    });
                    yield message.reply({ embeds: [embed] });
                })).catch((err) => __awaiter(this, void 0, void 0, function* () {
                    yield message.reply({ content: `${client.config.emojis.false} ${langdata.captcha[err.message]}` });
                }));
            });
        }
        if (args) {
            var user = args;
            if (user.bot)
                return;
            yield ReturnData(user);
        }
        else {
            if (message.user.bot)
                return;
            yield ReturnData(message.user);
        }
    })
};
exports.default = Ping;
