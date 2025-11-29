import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store';

// Interface for guest data
interface GuestUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

interface Guest {
  id: number;
  relationship: string;
  user: GuestUser;
}

// Interface for API response
interface MemberDataResponse {
  success: boolean;
  data: {
    guests: Guest[];
  };
  message?: string;
}

export interface MemberData {
  id: number;
  guests: Guest[];
}

export const useMemberData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  const getMemberData = async (memberId: number): Promise<MemberData | null> => {
    const { token } = useAuthStore.getState();
    if (!token) {
      setError('No hay token de autenticación disponible.');
      Alert.alert('Error', 'No hay token de autenticación disponible.');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/club-members/${memberId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 404) {
          const errorMessage = 'Socio no encontrado: ' + (errorData.message || 'El socio no existe');
          setError(errorMessage);
          Alert.alert('Error', errorMessage);
          return null;
        } else {
          const errorMessage = errorData.message || `Error en la solicitud: ${response.status}`;
          setError(errorMessage);
          Alert.alert('Error', errorMessage);
          return null;
        }
      }

      const result: MemberDataResponse = await response.json();
      
      if (result.success) {
        const data: MemberData = {
          id: memberId,
          guests: result.data.guests || [],
        };
        setMemberData(data);
        return data;
      } else {
        const errorMessage = result.message || 'Error al obtener los datos del socio';
        setError(errorMessage);
        Alert.alert('Error', errorMessage);
        return null;
      }
    } catch (err: any) {
      console.error('Error fetching member data:', err);
      const errorMessage = err.message || 'Ocurrió un error al obtener los datos del socio';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getMemberData,
    loading,
    error,
    memberData,
    clearMemberData: () => setMemberData(null),
  };
};