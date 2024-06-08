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
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
function LoadComamnds(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            fs_1.default.readdirSync(`${process.cwd()}/dist/Commands/`).forEach((dir) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const files = fs_1.default.readdirSync(`${process.cwd()}/dist/Commands/${dir}/`).filter((m) => m.endsWith(".js") || m.endsWith(".ts"));
                if (!files || files.length == 0)
                    return;
                for (const file of files) {
                    const CommandData = (_a = require(`${process.cwd()}/dist/Commands/${dir}/${file}`)) === null || _a === void 0 ? void 0 : _a.default;
                    if (CommandData && CommandData.name) {
                        client.commands.set(CommandData.name, CommandData);
                        if (CommandData.aliases && Array.isArray(CommandData.aliases)) {
                            CommandData.aliases.forEach((alis) => {
                                client.aliases.set(alis, CommandData.name);
                            });
                        }
                    }
                    else {
                        continue;
                    }
                }
            }));
            console.log(chalk_1.default.green(`[BOT] - Commands Loaded`));
        }
        catch (error) {
            console.log(chalk_1.default.red(`[BOT ERROR] - ${error.message}`));
        }
    });
}
exports.default = LoadComamnds;
