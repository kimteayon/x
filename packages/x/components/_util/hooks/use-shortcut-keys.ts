import { useEffect } from "react";
import { XComponentsConfig } from "../../x-provider/context";
import useXComponentConfig from "./use-x-component-config";

const useShortcutKeys = <C extends keyof XComponentsConfig>(component: C, shortcutKeys: Required<XComponentsConfig>[C]["shortcutKeys"]) => {
    const contextConfig = useXComponentConfig(component);
    const mergeShortcutKeys = Object.assign({}, contextConfig.shortcutKeys, shortcutKeys);
    useEffect(() => {
        if (Object.keys(mergeShortcutKeys).length === 0) return;

        const onKeydown = (event: KeyboardEvent) => {
            for (const subComponent of Object.keys(mergeShortcutKeys || [])) {
                for (const shortcutKeys of mergeShortcutKeys[subComponent]) {
                    console.log(shortcutKeys, event, subComponent, 1111)
                }
            }
        };

        document.addEventListener('keydown', onKeydown);

        return () => {
            document.removeEventListener('keydown', onKeydown);
        };
    }, [mergeShortcutKeys]);
};

export default useShortcutKeys;