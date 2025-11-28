
//Obtener el toekn
import { useAuthStore } from '../../auth/store/useAuthStore';

// Get user information from auth service
// const getUserInfo = () => {
//   // Using mock user data from auth service
//   return {
//     id: '22308', // Member number as requested
//     name: 'Mariana Landy Jimenez',
//     address: 'Privada Jazmín No. 101 Col. Montealegre',
//     city: 'Tampico, Tamaulipas',
//     postalCode: '89210',
//     memberSince: new Date('2020-05-15'),
//     membershipType: 'Premium',
//   };
// };

// Mock data for account statements with detailed information
export const accountStatementService = {
  getAccountStatements: async (clubMemberId?: number, page: number = 1, limit: number = 5) => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/account-statements/member/${clubMemberId}?page=${page}&limit=${limit}`, 
        {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${useAuthStore.getState().token}` 
          },
        }
      );
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al obtener los estados de cuenta');
      }

      const data = await response.json();
      return data.data;
      
    } catch (error) {
      console.error('Error en getAccountStatements:', error);
      throw error;
    }
  },
  
  getAccountStatementById: async (id: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/account-statements/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al obtener el estado de cuenta');
      }

      const data = await response.json();
      return data.data
    } catch (error) {
      console.error('Error en getAccountStatementById:', error);
      throw error;
    }
  },
  
   downloadAccountStatement: async (id: string) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/account-statements/download/${id}`, {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().token}`
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || 'Error al descargar el estado de cuenta');
      }

      const data = await response.json();

      return data.data
    } catch (error) {
      throw error;
    }
  }
};