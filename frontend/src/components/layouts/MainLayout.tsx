import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { UserMenu } from '../ui/UserMenu'; // ajusta la ruta si es necesario

export const MainLayout = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);
  console.log(user)

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img src="src\assets\Logo.png" alt="Logo" className='w-15 h-15' />
             {/*  <span className="text-2xl font-bold text-indigo-600">ToroGo!</span> */}
            </div>

            {/* Atajos personalizados */}
            <div className="hidden md:flex space-x-6">
              {/* <Link to="/home" className="text-gray-700 hover:text-indigo-500 transition">Inicio</Link> */}
              <Link to="/trips" className="text-gray-700 hover:text-indigo-500 transition">Viajes</Link>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-500 transition">Perfil</Link>
              <Link to="/support" className="text-gray-700 hover:text-indigo-500 transition">Soporte</Link>
            </div>

            {/* Usuario y rol */}
            <div className="flex items-center space-x-4">
              
                <Link
                  to={role === 'driver' ? '/service/driver' : '/service/passenger'}
                  className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                >
                  Inicia tu Viaje
                </Link>
                <UserMenu user={user} role={role} />
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
};