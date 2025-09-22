## 🚀 Inicio del Proyecto — ToroGo v0.1

Esta es la versión inicial del sistema ToroGo, orientado a la gestión de viajes para pasajeros y conductores en el sector mototaxi. Actualmente se encuentra en fase de desarrollo y pruebas internas.

### 🛠️ Configuración del entorno

1. Clona el repositorio y accede a las carpetas correspondientes:

git clone https://github.com/tu-usuario/torogo.git
cd torogo

2.  Instala las dependencias en ambos entornos:
cd ../backend
npm install

cd ../frontend
npm install

3. Configura tus variables de entorno:
- Crea un archivo .env en las carpetas backend/ y frontend/.
- Ajusta las rutas, credenciales y puertos según tu sistema local.

4. Asegúrate de tener PostgreSQL instalado en tu máquina. Puedes descargarlo desde el siguiente enlace:
https://www.postgresql.org/download/ 

▶️ Ejecución del proyecto
Inicia ambos servidores en terminales separadas:
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

