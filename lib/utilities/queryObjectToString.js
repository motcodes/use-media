"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var camelToHyphen_1 = require("./camelToHyphen");
var QUERY_COMBINATOR = ' and ';
function queryObjectToString(query) {
    if (typeof query === 'string') {
        return query;
    }
    return Object.entries(query)
        .map(function (_a) {
        var feature = _a[0], value = _a[1];
        var convertedFeature = (0, camelToHyphen_1.default)(feature);
        var convertedValue = value;
        if (typeof convertedValue === 'boolean') {
            return convertedValue ? convertedFeature : "not ".concat(convertedFeature);
        }
        if (typeof convertedValue === 'number' &&
            /[height|width]$/.test(convertedFeature)) {
            convertedValue = "".concat(convertedValue, "px");
        }
        return "(".concat(convertedFeature, ": ").concat(convertedValue, ")");
    })
        .join(QUERY_COMBINATOR);
}
exports.default = queryObjectToString;
