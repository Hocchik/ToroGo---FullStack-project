export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Sobre ToroGo!</h1>
        <p className="text-xl text-gray-600">Transformando la movilidad urbana</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-semibold mb-6">Nuestra Misión</h2>
          <p className="text-gray-600 mb-4">
            Brindar un servicio de transporte seguro, eficiente y accesible mediante 
            nuestra red de mototaxis verificados, mejorando la movilidad en la ciudad.
          </p>
          <p className="text-gray-600">
            Nos comprometemos a crear oportunidades de trabajo digno para conductores 
            y un servicio confiable para pasajeros.
          </p>
        </div>
        <div className="bg-gray-200 h-80 rounded-lg"></div>
      </div>

      <div className="bg-orange-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestros Valores</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2">Seguridad</h3>
            <p className="text-gray-600">La seguridad de nuestros usuarios es nuestra prioridad número uno</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2">Confianza</h3>
            <p className="text-gray-600">Construimos relaciones basadas en la transparencia y el respeto</p>
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-xl mb-2">Innovación</h3>
            <p className="text-gray-600">Mejoramos constantemente nuestro servicio con tecnología</p>
          </div>
        </div>
      </div>
    </div>
  );
};