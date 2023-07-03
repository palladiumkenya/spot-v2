import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Details = Loadable(lazy(() => import('./Details')));
const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
	{ path: '/stats', element: <Analytics />, auth: authRoles.guest },
	{ path: '/showcase/:param', element: <Details />, auth: authRoles.guest },
];

export default dashboardRoutes;
