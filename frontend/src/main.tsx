import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import DashboardLayout from './Dashboard/DashboardLayout.tsx';
import ActivityIdeas from './pages/ActivityIdeas.tsx';
import NewIdea from './pages/NewIdea.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/dashboard', element: <DashboardLayout /> },
  { path: '/activity-ideas', element: <ActivityIdeas /> },
  { path: '/new-idea', element: <NewIdea /> },
  { path: '*', element: <NotFoundPage /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
