"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMediaLayout = exports.useMedia = exports.mockMediaQueryList = void 0;
var react_1 = require("react");
var utilities_1 = require("./utilities");
exports.mockMediaQueryList = {
    media: '',
    matches: false,
    onchange: utilities_1.noop,
    addListener: utilities_1.noop,
    removeListener: utilities_1.noop,
    addEventListener: utilities_1.noop,
    removeEventListener: utilities_1.noop,
    dispatchEvent: function (_) { return true; },
};
var createUseMedia = function (effect) {
    return function (rawQuery, defaultState) {
        if (defaultState === void 0) { defaultState = false; }
        var _a = (0, react_1.useState)(defaultState), state = _a[0], setState = _a[1];
        var query = (0, utilities_1.queryObjectToString)(rawQuery);
        effect(function () {
            var mounted = true;
            var mediaQueryList = typeof window === 'undefined'
                ? exports.mockMediaQueryList
                : window.matchMedia(query);
            var onChange = function () {
                if (!mounted) {
                    return;
                }
                setState(Boolean(mediaQueryList.matches));
            };
            mediaQueryList.addListener(onChange);
            setState(mediaQueryList.matches);
            return function () {
                mounted = false;
                mediaQueryList.removeListener(onChange);
            };
        }, [query]);
        return state;
    };
};
exports.useMedia = createUseMedia(react_1.useEffect);
exports.useMediaLayout = createUseMedia(react_1.useLayoutEffect);
exports.default = exports.useMedia;
