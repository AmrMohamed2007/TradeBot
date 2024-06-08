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
const chalk_1 = __importDefault(require("chalk"));
const discord_js_1 = require("discord.js");
const ms_1 = __importDefault(require("ms"));
const ReadyEvent = {
    name: "ready",
    once: true,
    run: (client) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(chalk_1.default.green(`[BOT] - ${client.user.username} Ready`));
        client.user.setPresence({
            status: "online",
            activities: [
                { name: "/help", type: discord_js_1.ActivityType.Playing },
            ]
        });
        yield client.schema.find({}).then((s) => {
            s.forEach((res) => __awaiter(void 0, void 0, void 0, function* () {
                res.email = undefined;
                res.code = undefined;
                res.sendAt = undefined;
                res.verified = true;
                if (res.premium.subscribed) {
                    res.premium.createdAt = Date.now();
                    res.premium.days = (0, ms_1.default)("365d");
                }
                yield res.save();
            }));
        });
    })
};
exports.default = ReadyEvent;
