import { routes } from './routes';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(routes);

export const Router = () => <RouterProvider router={router} />;
