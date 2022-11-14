import Error from 'src/components/Error';
import Lazy from 'src/components/Lazy';
import Loader from 'src/components/Loader';

export const paths = [
  {
    path: '/users',
    element: (
      <Lazy component={() => import('src/views/Users')} loader={<Loader />} />
    ),
    errorComponent: <Error />,
  },
  {
    path: '/users/:id',
    element: (
      <Lazy component={() => import('src/views/User')} loader={<Loader />} />
    ),
    errorComponent: <Error />,
  },
  {
    path: '/users/:id/edit',
    element: (
      <Lazy
        component={() => import('src/views/UserEdit')}
        loader={<Loader />}
      />
    ),
    errorComponent: <Error />,
  },
];
