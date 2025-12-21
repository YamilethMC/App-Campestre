import { useState } from 'react';
import { Alert } from 'react-native';
import {
  deleteGuest as deleteGuestFromService,
  getMemberData as getMemberDataFromService,
  MemberData,
} from '../services/homeService';

export const useMemberData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  const getMemberData = async (memberId: number): Promise<MemberData | null> => {
    setLoading(true);
    setError(null);
    console.log(',,,,,,,,,,,Fetching member data for member ID:', memberId);
    const result = await getMemberDataFromService(memberId);
    console.log('--------------------------------------Member data result:', result);
    if (result.success && result.data) {
      setMemberData(result.data);
      console.log('Member data set:', result.data);
      setLoading(false);
      return result.data;
    } else {
      Alert.alert('Error', result.error || 'Error al obtener los datos del socio');
      setLoading(false);
      return null;
    }
  };

  const deleteGuest = async (guestId: number): Promise<boolean> => {
    const result = await deleteGuestFromService(guestId);

    if (!result.success) {
      Alert.alert('Error', result.error || 'Error al eliminar el invitado');
      return false;
    }

    // After successful deletion, refresh the member data
    if (memberData?.id) {
      await getMemberData(memberData.id);
    }

    return true;
  };

  return {
    getMemberData,
    loading,
    error,
    memberData,
    clearMemberData: () => setMemberData(null),
    deleteGuest,
  };
};
