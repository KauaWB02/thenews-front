import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';
import Authentication from '../modules/authentication/Authentication';
import Snackbar from '../components/snackbar/Snackbar';
import PrivateRoute from './PrivateRoute';
import Streak from '../modules/streak/Streak';
import AuthenticatedLayout from '../layouts/authenticated-layout/AuthenticatedLayout';
import Dashboard from '../modules/dashboard/components/Dashboard';
import { useEffect, useState } from 'react';

const pageTitles: { [key: string]: string } = {
  '/login': 'Login - The News',
  '/dashboard': 'Dashboard - The News',
  '/streak': 'Streak - The News',
};

const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Navigate
        to={isAuthenticated() ? '/streak' : '/login'}
        replace
      />
    ),
  },
  {
    path: '/login',
    element: <Authentication />,
  },

  {
    path: '/dashboard',
    element: (
      <PrivateRoute requiredPermission='DASHBOARD-VIEW'>
        <AuthenticatedLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
    ],
  },

  {
    path: '/streak',
    element: (
      <PrivateRoute requiredPermission='STREAK-VIEW'>
        <AuthenticatedLayout />
      </PrivateRoute>
    ),
    children: [{ path: '/streak', element: <Streak /> }],
  },
]);

function AppRoute() {
  const [, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
      document.title = pageTitles[window.location.pathname] || 'amage';
    };

    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange();
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <>
      <Snackbar />
      <RouterProvider router={router} />
    </>
  );
}

export default AppRoute;
