import { useEffect, useState } from "react";
import { XComponentsConfig } from "../../x-provider/context";
import useXComponentConfig from "./use-x-component-config";
import { SignKeysType, ShortcutKeys } from "../type";
import { isTwoDimensionalArray } from "../array";
const NumberKeyCode = [49, 50, 51];
type ActiveInfoType = {
    activeKey: any;
    name: string;
    timeStamp: number;
}
const SignKeys: SignKeysType = {
    "Alt": "altKey",
    "Ctrl": "ctrlKey",
    "Meta": "metaKey",
    "Shift": "shiftKey"
}
const isKeyCode = (shortcutKey: ShortcutKeys<number | 'index'>, event: KeyboardEvent): false | ShortcutKeys<number> => {
    const copyShortcutKey = [...shortcutKey];
    const keyCode = copyShortcutKey.pop();
    const signKeys = copyShortcutKey as (keyof SignKeysType)[];
    const mergeKeyCode = shortcutKey.includes('index') ? [keyCode, ...NumberKeyCode] : [keyCode];
    if (mergeKeyCode.includes(event.keyCode)) {
        const isHit = signKeys.reduce((value, signKey) => {
            if (!value) return value;
            return event[(SignKeys?.[signKey])] as boolean || false;
        }, true);
        if (isHit) return [...signKeys, event.keyCode] as ShortcutKeys<number>;
        return isHit;
    }
    return false;
};

const shortcutKeysActive = (shortcutKeys: ShortcutKeys | ShortcutKeys[], event: KeyboardEvent) => {
    if (isTwoDimensionalArray(shortcutKeys)) {
        for (const shortcutKey of shortcutKeys) {
            const activeKey = isKeyCode(shortcutKey as ShortcutKeys, event);
            if (activeKey) return activeKey;
        }
        return false;
    } else {
        return isKeyCode(shortcutKeys as ShortcutKeys, event);
    }
}

const useShortcutKeys = <C extends keyof XComponentsConfig, S = Record<string, ShortcutKeys>>(component: C, shortcutKeys: S) => {
    const contextConfig = useXComponentConfig(component);
    const mergeShortcutKeys = Object.assign({}, contextConfig?.shortcutKeys || {}, shortcutKeys);
    const [activeInfo, setActiveInfo] = useState<ActiveInfoType>();
    useEffect(() => {
        if (Object.keys(mergeShortcutKeys).length === 0) return;
        const onKeydown = (event: KeyboardEvent) => {
            for (const name of Object.keys(mergeShortcutKeys || [])) {
                const activeKey = shortcutKeysActive(mergeShortcutKeys[name], event);
                if (activeKey) {
                    setActiveInfo({
                        activeKey,
                        name,
                        timeStamp: event.timeStamp
                    });
                }
            }
        };
        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, [mergeShortcutKeys]);
    return [activeInfo]
};

export default useShortcutKeys;