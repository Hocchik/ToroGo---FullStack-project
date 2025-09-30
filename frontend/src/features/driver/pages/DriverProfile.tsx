import React, { useState } from 'react';
import { /* Camera */ User, /* Phone, Mail, */ Car, Star, /* Clock, */ DollarSign, /* Award, */ MapPin,/*  ChevronRight, */ Calendar } from 'lucide-react';

interface DriverData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  rating: number;
  totalTrips: number;
  earnings: number;
  memberSince: string;
  licenseNumber: string;
  dni: string;
  vehicleInfo: {
    brand: string;
    model: string;
    year: string;
    plate: string;
    color: string;
  };
  licenseIssueDate: string;
  licenseExpiryDate: string;
  licenseStatus: string;
  status: 'active' | 'inactive' | 'busy';
  achievements: string[];
}

const DriverProfile: React.FC = () => {
  /* const [isEditing, setIsEditing] = useState(false); */
  const [profileData, setProfileData] = useState<DriverData>({
    id: '1',
    firstName: 'Carlos',
    lastName: 'Mendoza Rivera',
    email: 'carlos.mendoza@email.com',
    phone: '+51 987 123 456',
    profileImage: '',
    rating: 4.9,
    totalTrips: 342,
    earnings: 2850.50,
    memberSince: 'Marzo 2023',
    licenseNumber: 'L12345678',
    dni: '12345678',
    vehicleInfo: {
      brand: 'Honda',
      model: 'CB125F',
      year: '2022',
      plate: 'ABC-123',
      color: 'Rojo'
    },
    licenseIssueDate: '2020-06-15',
    licenseExpiryDate: '2025-06-15',
    licenseStatus: 'Vigente',
    status: 'active',
    achievements: ['Conductor del Mes', '100 Viajes Completados', 'Excelente Servicio']
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof DriverData] as Record<string, any>),
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto p-4">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Image and Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Image */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto overflow-hidden">
                    {profileData.profileImage ? (
                      <img 
                        src={profileData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                        <User size={48} className="text-white" />
                      </div>
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-red-600 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-red-700 transition-colors">
                    Cambiar foto de perfil
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">S/. {profileData.earnings.toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Ganancias Totales</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{profileData.totalTrips}</div>
                    <div className="text-sm text-gray-500">Viajes Completados</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{profileData.rating}</div>
                    <div className="text-sm text-gray-500">Calificación</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delete Account */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <button className="w-full text-left text-red-600 hover:text-red-700 font-medium">
                ELIMINAR CUENTA
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                    <input
                      type="text"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      placeholder="Nombre"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellidos</label>
                    <input
                      type="text"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      placeholder="Apellidos"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      placeholder="Número de teléfono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">DNI</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profileData.dni}
                        onChange={(e) => handleInputChange('dni', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors pr-10"
                        placeholder="12345678"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <Car className="mr-2 text-orange-600" size={20} />
                    Placa de vehículo
                  </h3>
                  <input
                    type="text"
                    value={profileData.vehicleInfo.plate}
                    onChange={(e) => handleInputChange('vehicleInfo.plate', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                    placeholder="ABC-123"
                  />
                </div>

                {/* License Information */}
                <div className="border-t pt-6 space-y-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Información de Licencia</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de emisión de licencia</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={profileData.licenseIssueDate}
                          onChange={(e) => handleInputChange('licenseIssueDate', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fecha de vencimiento de licencia</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={profileData.licenseExpiryDate}
                          onChange={(e) => handleInputChange('licenseExpiryDate', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors pr-10"
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Estado de licencia</label>
                      <select
                        value={profileData.licenseStatus}
                        onChange={(e) => handleInputChange('licenseStatus', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-100 border-none rounded-md focus:bg-white focus:ring-2 focus:ring-orange-500 focus:outline-none transition-colors"
                      >
                        <option value="Vigente">Vigente</option>
                        <option value="Por vencer">Por vencer</option>
                        <option value="Vencida">Vencida</option>
                        <option value="Suspendida">Suspendida</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="border-t pt-6 flex justify-end space-x-3">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                    Cancelar
                  </button>
                  <button className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;