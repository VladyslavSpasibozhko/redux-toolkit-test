import Error from 'src/components/Error';
import Lazy from 'src/components/Lazy';
import Loader from 'src/components/Loader';

export const paths = [
  {
    path: '/comments',
    element: (
      <Lazy
        component={() => import('src/views/Comments')}
        loader={<Loader />}
      />
    ),
    errorComponent: <Error />,
  },
  {
    path: '/comments/:id',
    element: (
      <Lazy component={() => import('src/views/Comment')} loader={<Loader />} />
    ),
    errorComponent: <Error />,
  },
];
