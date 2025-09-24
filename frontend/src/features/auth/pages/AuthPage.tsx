import toriGo from '/src/assets/logo-torigo.jpg';
import LoginForm  from '../components/LoginForm';

export const AuthPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">
      <div className="min-h-screen flex">
        {/* Logo Section - Left Side */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 bg-[#F7F7F7] items-center justify-center p-12">
          <div className="max-w-md">
            <img
              src={toriGo}
              alt="ToriGo"
              className="w-150 h-150 object-contain"
            />
          </div>
        </div>

        {/* Login Form Section - Right Side */}
        <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <img
                src={toriGo}
                alt="ToriGo"
                className="w-32 h-32 object-contain mx-auto mb-6"
              />
            </div>
          </div>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
};