export const ContactPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-xl text-gray-600">Estamos aquí para ayudarte</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
            <div className="space-y-4">
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📧</span>
                soporte@torogo.com
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📞</span>
                (01) 555-0123
              </p>
              <p className="flex items-center text-gray-600">
                <span className="mr-2">📍</span>
                Av. Principal 123, Lima
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Horario de Atención</h2>
            <div className="space-y-2 text-gray-600">
              <p>Lunes a Viernes: 8:00 AM - 8:00 PM</p>
              <p>Sábados y Domingos: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <form className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded-md"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mensaje
            </label>
            <textarea
              className="w-full p-2 border rounded-md h-32"
              placeholder="¿Cómo podemos ayudarte?"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};