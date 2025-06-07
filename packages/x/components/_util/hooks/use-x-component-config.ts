import React from 'react';
import XProviderContext from '../../x-provider/context';

import type { BaseComponentConfig, XComponentsConfig } from '../../x-provider/context';

const defaultXComponentStyleConfig: BaseComponentConfig = {
  classNames: {},
  styles: {},
  className: '',
  style: {},
};

const useXComponentConfig = <C extends keyof XComponentsConfig>(
  component: C,
): Required<XComponentsConfig>[C] & BaseComponentConfig => {
  const xProviderContext = React.useContext(XProviderContext);

  return React.useMemo(
    () => ({
      ...defaultXComponentStyleConfig,
      ...xProviderContext[component],
    }),
    [xProviderContext[component]],
  );
};

export default useXComponentConfig;
