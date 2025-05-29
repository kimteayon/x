// @ts-nocheck
export type AnyObject = Record<PropertyKey, any>;
type BaseShortcutKey = 'Ctrl' | 'Alt' | 'Meta' | 'Shift';
export type ShortcutKeys<CustomKey = number> = [BaseShortcutKey, BaseShortcutKey , CustomKey] | [BaseShortcutKey, CustomKey]