import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

// Layouts
import { MainLayout } from '../components/layouts/MainLayout';
/* import { AuthLayout } from '../components/layouts/AuthLayout'; */

// Public Pages
import { HomePage } from '../features/home/pages/HomePage';
import { AboutPage } from '../features/home/pages/AboutPage';
import { ContactPage } from '../features/home/pages/ContactPage';

// Auth Pages
import { AuthPage } from '../features/auth/pages/AuthPage';
/* import { RequestTrip } from '../features/passenger/pages/RequestTrip';

import { LoginForm } from '../features/auth/components/LoginForm';
import { RegisterForm } from '../features/auth/components/RegisterForm'; */

// Protected Pages
import { PassengerDashboard } from '../features/passenger/pages/PassengerDashboard';
import { DriverDashboard } from '../features/driver/pages/DriverDashboard';
import type { JSX } from 'react';

// ServiceRoute es para rutas que requieren autenticación
const ServiceRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  
  if (!token) {
    // Redirige al login si intentan acceder a servicios sin autenticación
    return <Navigate to="/auth/login" replace />;
  }
  
  return children;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Rutas Públicas - Accesibles sin login */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />


          {/* Rutas de Servicio - Requieren autenticación */}
          <Route path="service" element={<ServiceRoute><MainLayout /></ServiceRoute>}>
            {/* Dashboard de Pasajero */}
            <Route path="passenger" element={<PassengerDashboard />} />
            
            {/* Dashboard de Conductor */}
            <Route path="driver" element={<DriverDashboard />} />
          </Route>

        </Route>

        {/* Rutas de Autenticación */}
        <Route path="auth" element={<AuthPage />} />

        {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};