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
const terra = {
    name: "terra",
    aliases: ["t"],
    cooldown: 20000,
    run: (client, message, args, langdata) => __awaiter(void 0, void 0, void 0, function* () {
        function ReturnData(user) {
            return __awaiter(this, void 0, void 0, function* () {
                yield client.functions.get.GetUser(client.schema, { key: "userid", value: user.id, status: "one" }).then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (res.blacklisted.bool || res.scummer.bool)
                        return;
                    if (!res.password) {
                        const embed = yield client.CreateEmbed({
                            title: langdata.private.titleuser, fields: [
                                { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                                { value: `${res.secured ? `${client.config.emojis.passwordver.repeat(4)}` : res.coins}`, name: `${langdata.private.coins}`, inline: true },
                            ],
                            color: client.config.maincolor,
                        });
                        message.reply({ embeds: [embed] });
                    }
                    if (res.password) {
                        if (user.id !== message.author.id) {
                            const embed = yield client.CreateEmbed({
                                title: langdata.private.titleuser, fields: [
                                    { value: `${user.id}`, name: `${langdata.private.userid}`, inline: true },
                                    { value: `${client.config.emojis.passwordver.repeat(4)}`, name: `${langdata.private.coins}`, inline: true },
                                ],
                                color: client.config.maincolor,
                            });
                            message.reply({ embeds: [embed] });
                        }
                        else {
                            yield client.captcha.CaptchaReact(client, message, langdata, "terraShow");
                        }
                    }
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
exports.default = terra;
