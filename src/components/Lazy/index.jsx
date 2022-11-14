import React, { useMemo } from 'react';

export default function Lazy({ loader, component }) {
  const Component = useMemo(() => React.lazy(component), [component]);

  return (
    <React.Suspense fallback={loader}>
      <Component />
    </React.Suspense>
  );
}
