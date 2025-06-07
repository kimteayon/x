"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NumberKeyCode = void 0;
var _react = require("react");
var _useXComponentConfig = _interopRequireDefault(require("./use-x-component-config"));
var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));
const NumberKeyCode = exports.NumberKeyCode = Array.from({
  length: 9
}, (_, i) => _KeyCode.default.ONE + i);
const SignKeys = {
  "Alt": "altKey",
  "Ctrl": "ctrlKey",
  "Meta": "metaKey",
  "Shift": "shiftKey"
};
const getActionShortcutInfo = (shortcutKey, event) => {
  const copyShortcutKey = [...shortcutKey];
  const keyCode = copyShortcutKey.pop();
  const signKeys = copyShortcutKey;
  const mergeKeyCodeDict = shortcutKey.includes('number') ? [keyCode, ...NumberKeyCode] : [keyCode];
  const hitKey = signKeys.reduce((value, signKey) => {
    if (!value) return value;
    return event[SignKeys[signKey]] || false;
  }, mergeKeyCodeDict.includes(event.keyCode));
  if (hitKey) return {
    actionShortcutKey: [...signKeys, event.keyCode],
    actionKeyCodeNumber: shortcutKey.includes('number') ? NumberKeyCode.indexOf(event.keyCode) : false,
    actionKeyCode: event.keyCode,
    timeStamp: event.timeStamp
  };
  return false;
};
const useShortcutKeys = (component, shortcutKeys) => {
  const contextConfig = (0, _useXComponentConfig.default)(component);
  const mergeShortcutKeys = Object.assign({}, contextConfig?.shortcutKeys || {}, shortcutKeys);
  const [actionShortcutInfo, setActionShortcutInfo] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (Object.keys(mergeShortcutKeys).length === 0) return;
    const onKeydown = event => {
      for (const name of Object.keys(mergeShortcutKeys || [])) {
        const subShortcutKeys = mergeShortcutKeys[name];
        if (!Array.isArray(subShortcutKeys)) return;
        if (subShortcutKeys.every(item => Array.isArray(item))) {
          subShortcutKeys.forEach((shortcutKey, index) => {
            const activeKeyInfo = getActionShortcutInfo(shortcutKey, event);
            if (activeKeyInfo) setActionShortcutInfo({
              ...activeKeyInfo,
              name,
              index
            });
          });
        } else {
          const activeKeyInfo = getActionShortcutInfo(subShortcutKeys, event);
          if (activeKeyInfo) setActionShortcutInfo({
            ...activeKeyInfo,
            name
          });
        }
      }
    };
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, [mergeShortcutKeys]);
  return [actionShortcutInfo];
};
var _default = exports.default = useShortcutKeys;