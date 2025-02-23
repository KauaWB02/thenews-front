import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';
import Authentication from '../modules/authentication/Authentication';
import Snackbar from '../components/snackbar/Snackbar';
import PrivateRoute from './PrivateRoute';
import Streak from '../modules/streak/Streak';
import AuthenticatedLayout from '../layouts/authenticated-layout/AuthenticatedLayout';
import Dashboard from '../modules/dashboard/components/Dashboard';

// Função para verificar se o usuário está autenticado
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
      { path: '/dashboard', element: <Dashboard /> }, // Definindo o componente correto para a rota
    ],
  },

  {
    path: '/streak',
    element: (
      <PrivateRoute requiredPermission='STREAK-VIEW'>
        <AuthenticatedLayout />
      </PrivateRoute>
    ),
    children: [
      { path: '/streak', element: <Streak /> }, // Definindo o componente correto para a rota
    ],
  },
]);

function AppRoute() {
  return (
    <>
      <Snackbar />
      <RouterProvider router={router} />
    </>
  );
}

export default AppRoute;
