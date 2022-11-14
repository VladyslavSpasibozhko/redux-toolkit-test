import { paths as usersPaths } from './users';
import { paths as commentsPaths } from './comments';
import { paths as rootPaths } from './root';
import { paths as counterPaths } from './counter';

export const routes = [
  ...rootPaths,
  ...usersPaths,
  ...commentsPaths,
  ...counterPaths,
];
