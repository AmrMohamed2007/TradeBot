"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    cupon: String,
    duration: String
});
const cupons = (0, mongoose_1.model)("cupons", UserSchema);
exports.default = cupons;
