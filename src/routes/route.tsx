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
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Função para atualizar o título da aba conforme a navegação muda
    const handleRouteChange = () => {
      setCurrentPath(window.location.pathname);
      document.title = pageTitles[window.location.pathname] || 'amage';
    };

    // Adiciona um listener para monitorar mudanças de rota
    window.addEventListener('popstate', handleRouteChange);
    handleRouteChange(); // Atualiza o título na carga inicial

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
