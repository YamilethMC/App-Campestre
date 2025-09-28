// Tipos de datos
type UserRole = 'admin' | 'user';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  memberSince: Date;
  membershipType: string;
  familyMembers: FamilyMember[];
  vehicles: Vehicle[];
  emergencyContact: EmergencyContact;
}

export interface FamilyMember {
  id: number;
  name: string;
  relationship: string;
  age: number;
  isActive: boolean;
}

export interface Vehicle {
  id: number;
  plate: string;
  model: string;
  isActive: boolean;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

// Base de datos mock de usuarios
const mockUsers: UserProfile[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan.perez@clubtampico.com',
    token: 'mock-jwt-token-admin-123',
    refreshToken: 'mock-jwt-refresh-token-admin-123',
    expiresAt: new Date('2025-05-15'),
    memberSince: new Date('2020-05-15'),
    membershipType: 'Premium',
    familyMembers: [
      { id: 1, name: 'María López', relationship: 'Esposa', age: 35, isActive: true },
      { id: 2, name: 'Carlos Pérez', relationship: 'Hijo', age: 12, isActive: true },
      { id: 3, name: 'Ana Pérez', relationship: 'Hija', age: 8, isActive: true },
    ],
    vehicles: [
      { id: 1, plate: 'ABC-1234', model: 'Toyota RAV4 2022', isActive: true },
      { id: 2, plate: 'XYZ-5678', model: 'Honda Civic 2020', isActive: false },
    ],
    emergencyContact: {
      name: 'Juan Pérez',
      relationship: 'Hermano',
      phone: '555-123-4567',
    },
  }
];

// Simular retraso de red
const simulateNetworkDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Servicio de autenticación
export const authService = {
  /**
   * Iniciar sesión con email y contraseña
   */
  login: async (email: string, password: string): Promise<{ success: boolean; user?: UserProfile; error?: string }> => {
    await simulateNetworkDelay();
    
    // Validación simple para propósitos de demostración
    // En una aplicación real, esto se haría en el servidor
    if (!email || !password) {
      return { 
        success: false, 
        error: 'Email y contraseña son requeridos' 
      };
    }

    // Buscar usuario por email
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    // En un caso real, aquí se verificaría la contraseña hasheada
    if (!user || password !== '123456') { // Contraseña hardcodeada para demo
      return { 
        success: false, 
        error: 'Credenciales inválidas' 
      };
    }
    
    return { 
      success: true, 
      user: user
    };
  },

  /**
   * Cerrar sesión
   */
  logout: async (): Promise<void> => {
    await simulateNetworkDelay();
    localStorage.removeItem('authToken');
  },

  /**
   * Obtener el perfil del usuario actual
   */
  getCurrentUser: async (): Promise<UserProfile | null> => {
    await simulateNetworkDelay();
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    const user = mockUsers.find(u => u.token === token);
    if (!user) return null;
    
    return user;
  },

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated: async (): Promise<boolean> => {
    const user = await authService.getCurrentUser();
    return !!user;
  }
};
