import React, { useEffect, useRef } from 'react';
import withComponent, { ComponentProps } from '../common/withComponent';
const DataTable = (props: ComponentProps) => {
  const cqRef = useRef(null);

  useEffect(() => {
    const propsList = ['data', 'columns', 'expandable', 'rangeSelection', 'loading'];
    for (const key in props) {
      if (key !== 'codeInfo' && propsList.includes(key) && cqRef.current) {
        (cqRef.current as any)[key] = (props as any)[key];
      }
    }
  }, [props]);
  return (
    <kdcq-datatable
      ref={cqRef}
      key-field="id"
      max-row-selection={props['max-row-selection']}
      hide-checkbox-column={props['hide-checkbox-column']}
    ></kdcq-datatable>
  );
};

export default withComponent(DataTable);
