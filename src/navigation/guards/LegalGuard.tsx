import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { legalService } from '../../features/legal/services/legalService';
import { COLORS } from '../../shared/theme/colors';

interface LegalGuardProps {
  children: React.ReactNode;
}

export const LegalGuard: React.FC<LegalGuardProps> = ({ children }) => {
  const navigation = useNavigation();
  const [checking, setChecking] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    checkLegalStatus();
  }, []);

  const checkLegalStatus = async () => {
    const result = await legalService.getUserLegalStatus();

    if (result.success && result.data) {
      if (result.data.hasPendingDocuments) {
        navigation.navigate('LegalDocument' as never);
        setHasAccess(false);
      } else {
        setHasAccess(true);
      }
    } else {
      setHasAccess(true);
    }

    setChecking(false);
  };

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!hasAccess) {
    return null;
  }

  return <>{children}</>;
};
