import React from 'react';
import Error from 'src/components/Error';
import Lazy from 'src/components/Lazy';
import Loader from 'src/components/Loader';

export const paths = [
  {
    path: '/',
    element: (
      <Lazy component={() => import('src/views/Main')} loader={<Loader />} />
    ),
    errorElement: <Error />,
  },
];
