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
exports.Run = void 0;
const Client_1 = __importDefault(require("./Client"));
const Logger_1 = require("./Logger");
const Mongoose_1 = require("./Mongoose");
function Run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, Logger_1.Login)(Client_1.default, Client_1.default.config.token);
        yield (0, Mongoose_1.ConnectMongoose)(Client_1.default.config.mongoose);
    });
}
exports.Run = Run;
