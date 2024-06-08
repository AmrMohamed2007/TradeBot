"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ServerSchema = new mongoose_1.Schema({
    guildid: String,
    lang: { type: String, default: "en" },
    blacklisted: {
        bool: Boolean,
        reason: String
    },
    panel: {
        bool: Boolean,
        role: String,
    },
    reaction: {
        type: String,
        default: "<:6556:1243622173386608801>"
    },
    image: String,
    color_start: {
        type: String,
        default: "#00FF75"
    },
    color_end: {
        type: String,
        default: "Red"
    },
    thumbnail: String
});
const Server = (0, mongoose_1.model)("server", ServerSchema);
exports.default = Server;
