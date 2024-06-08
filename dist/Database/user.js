"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userid: String,
    username: String,
    coins: { type: Number, default: 0 },
    lastcoins: { type: Number, default: 0 },
    password: String,
    email: String,
    firstname: String,
    lastname: String,
    blacklisted: {
        bool: Boolean,
        reason: String,
        time: Number
    },
    premium: {
        subscribed: Boolean,
        createdAt: Number,
        days: Number,
        code: String
    },
    card: {
        cardNumber: String,
        cvv: String,
        coins: Number
    },
    createdAt: { type: Number, default: Date.now() },
    log: [
        {
            amount: Number,
            msg: String,
            userr: String,
            usert: String,
            typelog: Number,
            time: Number,
            guildid: String
        }
    ],
    daily: {
        taken: Boolean,
        takenAt: Number
    },
    secured: { type: Boolean, default: false },
    scummer: {
        bool: Boolean,
        data: [
            {
                user: String, amount: String,
                product: String,
                time: Number
            }
        ]
    },
    sendAt: Number,
    code: Number,
    verified: { type: Boolean, default: false }
});
const User = (0, mongoose_1.model)("user", UserSchema);
exports.default = User;
