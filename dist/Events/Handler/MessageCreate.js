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
const Embeds_1 = require("../../Tools/Embeds");
const pretty_ms_1 = __importDefault(require("pretty-ms"));
const Event = {
    name: "messageCreate",
    once: false,
    run: (client, message) => __awaiter(void 0, void 0, void 0, function* () {
        if (message.author.bot || !message.content)
            return;
        if (message.channel.type !== 0)
            return;
        const { cooldown, prefix, commands, aliases, GetLang } = client;
        if (!prefix || !message.content.startsWith(prefix))
            return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        if (!cmd || cmd.length == 0)
            return;
        var Command = commands.get(cmd);
        if (!Command)
            Command = commands.get(aliases.get(cmd));
        if (!Command)
            return;
        var { author, reply } = message;
        var LangData = yield GetLang(client, message.guild.id);
        var MemberClient = message.guild.members.cache.get(client.user.id);
        if (Command.cooldown) {
            if (cooldown.has(`${Command.name}${author.id}`))
                return yield message.reply({ content: `${LangData.cooldown.message.replace("<duration>", (0, pretty_ms_1.default)(cooldown.get(`${Command.name}${author.id}`) - Date.now()))}`, ephemeral: true });
            if (Command.owner && !client.config.owners.includes(author.id))
                return yield message.reply({ content: `${LangData.owner.message}`, ephemeral: true });
            if (Command.ownership && author.id !== message.guild.ownerId) {
                return yield message.reply({ content: `${LangData.ownership.message}`, ephemeral: true });
            }
            if (Command.botPerms || Command.userPerms) {
                if (!MemberClient.permissions.has(discord_js_1.PermissionsBitField.resolve(Command.botPerms || [])))
                    return yield reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.error.permissionme, color: client.config.maincolor })] });
                if (!message.member.permissions.has(discord_js_1.PermissionsBitField.resolve(Command.userPerms || [])))
                    return yield reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.error.permission, color: client.config.maincolor })] });
            }
            Command.run(client, message, args, LangData);
            cooldown.set(`${Command.name}${message.author.id}`, Date.now() + Command.cooldown);
            setTimeout(() => {
                cooldown.delete(`${Command.name}${message.author.id}`);
            }, Command.cooldown);
        }
        else {
            if (Command.owner && !client.config.owners.includes(author.id))
                return yield message.reply({ content: `${LangData.owner.message}`, ephemeral: true });
            if (Command.ownership && author.id !== message.guild.ownerId) {
                return yield message.reply({ content: `${LangData.ownership.message}`, ephemeral: true });
            }
            if (Command.botPerms || Command.userPerms) {
                if (!MemberClient.permissions.has(discord_js_1.PermissionsBitField.resolve(Command.botPerms || [])))
                    return yield message.reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.error.permissionme, color: client.config.maincolor })] });
                if (!message.member.permissions.has(discord_js_1.PermissionsBitField.resolve(Command.userPerms || [])))
                    return yield message.reply({ embeds: [yield (0, Embeds_1.WrongEmbed)({ title: "Missing Permission", description: LangData.error.permission, color: client.config.maincolor })] });
            }
            Command.run(client, message, args, LangData);
        }
    })
};
exports.default = Event;
