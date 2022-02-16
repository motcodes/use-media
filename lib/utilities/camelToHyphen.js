"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function camelToHyphen(camelString) {
    return camelString
        .replace(/[A-Z]/g, function (string) { return "-".concat(string.toLowerCase()); })
        .toLowerCase();
}
exports.default = camelToHyphen;
