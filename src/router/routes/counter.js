import Error from 'src/components/Error';
import Lazy from 'src/components/Lazy';
import Loader from 'src/components/Loader';

export const paths = [
  {
    path: '/counter',
    element: (
      <Lazy component={() => import('src/views/Counter')} loader={<Loader />} />
    ),
    errorComponent: <Error />,
  },
];
