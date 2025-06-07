import type { XComponentConfig, XComponentsConfig } from '../../x-provider/context';
declare const useXComponentConfig: <C extends keyof XComponentsConfig>(component: C) => Required<XComponentsConfig>[C] & XComponentConfig;
export default useXComponentConfig;
