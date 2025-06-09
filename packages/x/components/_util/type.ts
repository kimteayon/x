export type AnyObject = Record<PropertyKey, any>;
export type PrefixKeysType = {
    Ctrl: keyof KeyboardEvent,
    Alt: keyof KeyboardEvent,
    Meta: keyof KeyboardEvent,
    Shift: keyof KeyboardEvent
}
export type ShortcutKeys<CustomKey = number | 'number'> = [keyof SignKeysType, keyof SignKeysType, CustomKey] | [keyof SignKeysType, CustomKey]