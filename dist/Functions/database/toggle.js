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
exports.ToggleSomthing = void 0;
function ToggleSomthing(User, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            yield User.findOne({ [data.key]: data.value }).then((res) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                if (!res) {
                    reject({ type: 404, message: "errornoacc" });
                }
                else {
                    if (Array.isArray(res[data.keye])) {
                        if (data.status == "add") {
                            yield ((_b = (_a = res[data.keye]) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, data.valuee));
                            yield res.save();
                            resolve(res[data.keye]);
                        }
                        if (data.status == "remove") {
                            yield ((_d = (_c = res[data.keye]) === null || _c === void 0 ? void 0 : _c.pop) === null || _d === void 0 ? void 0 : _d.call(_c, data.valuee));
                            yield res.save();
                            resolve(res[data.keye]);
                        }
                    }
                    if (typeof res[data.keye] == "number") {
                        res[data.keye] += data.valuee;
                        yield res.save();
                        resolve(res[data.keye]);
                    }
                }
            }));
        }));
    });
}
exports.ToggleSomthing = ToggleSomthing;
