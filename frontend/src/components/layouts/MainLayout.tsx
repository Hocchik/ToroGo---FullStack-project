import { Outlet, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

export const MainLayout = () => {
  const { user, role } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">ToroGo!</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {user?.full_name} ({role})
              </span>
              {role === 'passenger' ? (
                <Link to="/passenger" className="text-blue-500 hover:text-blue-700">
                  Dashboard
                </Link>
              ) : (
                <Link to="/driver" className="text-blue-500 hover:text-blue-700">
                  Dashboard
                </Link>
              )}
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