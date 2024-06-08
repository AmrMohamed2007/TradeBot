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
const ms_1 = __importDefault(require("ms"));
const Ping = {
    name: "account",
    aliases: ["a"],
    cooldown: 20000,
    run: (client, message, args, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        function ReturnData(user) {
            return __awaiter(this, void 0, void 0, function* () {
                yield client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res.blacklisted.bool || res.scummer.bool)
                        return;
                    if ((Date.now() - res.premium.createdAt) >= (0, ms_1.default)(`${res.days}`)) {
                        res.premium = undefined;
                        yield res.save();
                    }
                    const embed = yield client.CreateEmbed({
                        title: langdata.private.titleuser, fields: [
                            { value: `${user.id}`, name: `${langdata.private.userid}`, inline: false },
                            { value: user.username, name: `${langdata.private.username}`, inline: false },
                            { value: user.displayName, name: `${langdata.private.displayname}`, inline: false },
                            { value: res.blacklisted.bool ? langdata.private.yes : langdata.private.no, name: `${langdata.private.blacklisted}`, inline: false },
                            { value: `${new Date(res.createdAt).toDateString()}`, name: `${langdata.private.createdAt}`, inline: false },
                        ],
                        color: client.config.maincolor,
                        author: { name: message.guild.name, iconURL: message.guild.iconURL() },
                        footer: { name: message.guild.name, iconURL: message.guild.iconURL() },
                    });
                    message.reply({ embeds: [embed] });
                })).catch((err) => __awaiter(this, void 0, void 0, function* () {
                    yield message.reply({ content: `${langdata.captcha[err.message]}` });
                }));
            });
        }
        if (args) {
            var user = message.mentions.users.first() ? message.mentions.users.first() : client.users.cache.get(args[0]);
            if (!user)
                user = message.author;
            if (user.bot)
                return;
            yield ReturnData(user);
        }
        else {
            if (message.author.bot)
                return;
            yield ReturnData(message.author);
        }
    })
};
exports.default = Ping;
