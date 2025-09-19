import { Link } from 'react-router-dom';

export const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Service Request */}
      <section className="relative h-screen bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Left side - Hero Content */}
          <div className="text-white space-y-6 max-w-xl">
            <h1 className="text-6xl font-bold">ToroGo!</h1>
            <p className="text-2xl">Viaja seguro en mototaxi por toda la ciudad</p>
            <div className="space-y-4">
              <Link 
                to="/auth"
                className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 inline-block w-full text-center"
              >
                Pedir Mototaxi
              </Link>
              <p className="text-sm text-white/80">
                ¿Eres conductor? <Link to="/auth?type=driver" className="underline">Únete aquí</Link>
              </p>
            </div>
          </div>

          {/* Right side - App Preview */}
          <div className="hidden lg:block w-1/3">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 shadow-xl">
              <h3 className="text-white text-xl font-semibold mb-4">¿A dónde vamos?</h3>
              <div className="space-y-4">
                <div className="bg-white/20 p-4 rounded-lg">
                  <p className="text-white/60">Viajes seguros y rápidos</p>
                </div>
                <div className="bg-white/20 p-4 rounded-lg">
                  <p className="text-white/60">Conductores verificados</p>
                </div>
                <Link 
                  to="/auth"
                  className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 block text-center"
                >
                  Comenzar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué elegir ToroGo?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Features cards */}
          </div>
        </div>
      </section>
    </div>
  );
};