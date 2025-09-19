import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

export const AuthPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(!searchParams.get('register'));

    const { token, role } = useSelector((state: RootState) => state.auth);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (token) {
      // Redirect based on role
      const redirectPath = role === 'passenger' 
        ? '/service/request' 
        : '/service/drive';
      navigate(redirectPath, { replace: true });
    }
  }, [token, role, navigate]);

  const handleToggle = (login: boolean) => {
    setIsLogin(login);
    navigate(`/auth${login ? '' : '?register=true'}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500">
      {/* Header with logo */}
      <div className="absolute top-4 left-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-white text-2xl font-bold">ToroGo!</span>
        </Link>
      </div>

      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="bg-white/95 backdrop-blur-sm w-full max-w-md rounded-3xl shadow-2xl p-8">
          {/* Auth Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {isLogin ? 'Bienvenido!' : 'Únete a ToroGo!'}
            </h2>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Accede a tu cuenta' : 'Crea tu cuenta para comenzar'}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
            <button
              className={`flex-1 py-3 rounded-xl transition-all duration-200 ${
                isLogin 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => handleToggle(true)}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 py-3 rounded-xl transition-all duration-200 ${
                !isLogin 
                  ? 'bg-orange-500 text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              onClick={() => handleToggle(false)}
            >
              Registrarse
            </button>
          </div>

          {/* Forms */}
          <div className="transition-all duration-300">
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>

          {/* Additional Links */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
              <button
                onClick={() => handleToggle(!isLogin)}
                className="ml-2 text-orange-500 hover:text-orange-600 font-semibold"
              >
                {isLogin ? 'Regístrate' : 'Inicia sesión'}
              </button>
            </p>
            {isLogin && (
              <Link 
                to="/forgot-password" 
                className="block mt-2 text-gray-500 hover:text-gray-600"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};