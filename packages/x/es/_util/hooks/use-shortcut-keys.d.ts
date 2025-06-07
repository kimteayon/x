import { XComponentsConfig } from "../../x-provider/context";
import { ShortcutKeys } from "../type";
export declare const NumberKeyCode: number[];
type ActionShortcutInfo = {
    actionShortcutKey: ShortcutKeys<number>;
    actionKeyCode: number;
    name: string;
    timeStamp: number;
    actionKeyCodeNumber: number | false;
    index?: number;
};
declare const useShortcutKeys: <C extends keyof XComponentsConfig, S = Record<string, ShortcutKeys | ShortcutKeys[]>>(component: C, shortcutKeys: S) => [ActionShortcutInfo?];
export default useShortcutKeys;
