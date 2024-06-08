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
exports.GiveawayStartup = void 0;
const { GiveawaysManager, GiveawaysManagerOptions } = require("../Tools/discord-giveaways/index.js");
function GiveawayStartup(client, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var giveawayModel = client.schemaGiveaway;
        const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
            constructor(client, options) {
                super(client, options);
                this.client = client;
                this.options = options;
                return this;
            }
            getAllGiveaways() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield giveawayModel.find().lean().exec();
                });
            }
            saveGiveaway(messageId, giveawayData) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield giveawayModel.create(giveawayData);
                    return true;
                });
            }
            editGiveaway(messageId, giveawayData) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield giveawayModel.updateOne({ messageId }, giveawayData).exec().then(() => {
                        return true;
                    }).catch((err) => {
                        return false;
                    });
                });
            }
            deleteGiveaway(messageId) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield giveawayModel.deleteOne({ messageId }).exec();
                    return true;
                });
            }
        };
        const manager = new GiveawayManagerWithOwnDatabase(client, {
            default: {
                botsCanWin: false,
                embedColor: "#aa2e2e",
                embedColorEnd: "#aa2e2e",
                reaction: "<:6556:1243622173386608801>"
            }
        });
        return manager;
    });
}
exports.GiveawayStartup = GiveawayStartup;
