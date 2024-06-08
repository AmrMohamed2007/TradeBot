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
exports.Disconnect = exports.Login = void 0;
const chalk_1 = __importDefault(require("chalk"));
const Handler_1 = require("./Handler");
const Loader_1 = require("./Loader");
function Login(client, token) {
    client.login(token)
        .then(() => __awaiter(this, void 0, void 0, function* () {
        yield (0, Handler_1.RunHandler)(client);
        yield (0, Loader_1.LoadFunctions)(client);
        console.log(chalk_1.default.green("[BOT] - Successfully Started"));
    }))
        .catch((err) => {
        console.log(chalk_1.default.red(`[BOT ERROR] - ${err.message}`));
    });
}
exports.Login = Login;
function Disconnect(client) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.destroy();
    });
}
exports.Disconnect = Disconnect;
