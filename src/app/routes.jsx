import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
	{
		element: (
			<MatxLayout />
		),
		children: [...dashboardRoutes],
	},
	...sessionRoutes,
	{ path: '/', element: <Navigate to="stats" /> },
	{ path: '*', element: <NotFound /> },
];

export default routes;
