import * as all from 'antd';
import * as React from 'react';

interface AntdProps {
  component: keyof typeof all;
}

function Antd(props: AntdProps) {
  const { component, ...restProps } = props;
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: it is useful
  const Component = (all[component] ?? React.Fragment) as React.ComponentType;

  return <Component {...restProps} />;
}

export default Antd;
