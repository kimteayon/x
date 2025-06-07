import { useEffect, useState } from "react";
import { XComponentsConfig } from "../../x-provider/context";
import useXComponentConfig from "./use-x-component-config";
import { SignKeysType, ShortcutKeys } from "../type";
import KeyCode from 'rc-util/lib/KeyCode';



export const NumberKeyCode = Array.from({ length: 9 }, (_, i) => KeyCode.ONE + i);
type ActionShortcutInfo = {
    actionShortcutKey: ShortcutKeys<number>;
    actionKeyCode: number;
    name: string;
    timeStamp: number;
    actionKeyCodeNumber: number | false;
    index?: number;
}
const SignKeys: SignKeysType = {
    "Alt": "altKey",
    "Ctrl": "ctrlKey",
    "Meta": "metaKey",
    "Shift": "shiftKey"
}

const getActionShortcutInfo = (shortcutKey: ShortcutKeys<number | 'number'>, event: KeyboardEvent): false | Omit<ActionShortcutInfo, 'name' | 'index'> => {
    const copyShortcutKey = [...shortcutKey];
    const keyCode = copyShortcutKey.pop();
    const signKeys = copyShortcutKey as (keyof SignKeysType)[];
    const mergeKeyCodeDict = shortcutKey.includes('number') ? [keyCode, ...NumberKeyCode] : [keyCode];

    const hitKey = signKeys.reduce((value, signKey) => {
        if (!value) return value;
        return event[(SignKeys[signKey])] as boolean || false;
    }, mergeKeyCodeDict.includes(event.keyCode));

    if (hitKey) return {
        actionShortcutKey: [...signKeys, event.keyCode] as ShortcutKeys<number>,
        actionKeyCodeNumber: shortcutKey.includes('number') ? NumberKeyCode.indexOf(event.keyCode) : false,
        actionKeyCode: event.keyCode,
        timeStamp: event.timeStamp,
    };
    return false;

};

const useShortcutKeys = <C extends keyof XComponentsConfig, S = Record<string, ShortcutKeys | ShortcutKeys[]>>(component: C, shortcutKeys: S): [ActionShortcutInfo?] => {
    const contextConfig = useXComponentConfig(component);
    const mergeShortcutKeys: Record<string, ShortcutKeys | ShortcutKeys[]> = Object.assign({}, contextConfig?.shortcutKeys || {}, shortcutKeys);
    const [actionShortcutInfo, setActionShortcutInfo] = useState<ActionShortcutInfo>();
    useEffect(() => {
        if (Object.keys(mergeShortcutKeys).length === 0) return;
        const onKeydown = (event: KeyboardEvent) => {
            for (const name of Object.keys(mergeShortcutKeys || [])) {
                const subShortcutKeys = mergeShortcutKeys[name];
                if (!Array.isArray(subShortcutKeys)) return;
                if (subShortcutKeys.every(item => Array.isArray(item))) {
                    subShortcutKeys.forEach((shortcutKey, index) => {
                        const activeKeyInfo = getActionShortcutInfo(shortcutKey, event);
                        if (activeKeyInfo) setActionShortcutInfo({
                            ...activeKeyInfo,
                            name,
                            index,
                        });
                    });

                } else {
                    const activeKeyInfo = getActionShortcutInfo(subShortcutKeys, event);
                    if (activeKeyInfo) setActionShortcutInfo({
                        ...activeKeyInfo,
                        name,
                    });
                }
            }
        };
        document.addEventListener('keydown', onKeydown);
        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, [mergeShortcutKeys]);
    return [actionShortcutInfo]
};

export default useShortcutKeys;