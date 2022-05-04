"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EasyPrecision = void 0;
var EasyPrecision;
(function (EasyPrecision) {
    EasyPrecision[EasyPrecision["LOW"] = Math.pow(2, 10)] = "LOW";
    EasyPrecision[EasyPrecision["NORMAL"] = Math.pow(2, 20)] = "NORMAL";
    EasyPrecision[EasyPrecision["HIGH"] = Math.pow(2, 30)] = "HIGH";
})(EasyPrecision = exports.EasyPrecision || (exports.EasyPrecision = {}));
