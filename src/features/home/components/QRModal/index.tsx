import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';
import { MemberData } from '../../services/homeService';
import QRCodeComponent from '../QRCodeComponent';
import qrCacheService, { CachedQRData } from '../../services/qrCacheService';

interface QRModalProps {
  visible: boolean;
  onClose: () => void;
  memberData: MemberData | null;
}

const QRModal: React.FC<QRModalProps> = ({
  visible,
  onClose,
  memberData
}) => {
  const [isOffline, setIsOffline] = useState(false);
  const [cachedData, setCachedData] = useState<CachedQRData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSavedDate, setLastSavedDate] = useState<string | null>(null);

  const dateOfAdmission = memberData?.dateOfAdmission
    ? new Date(memberData.dateOfAdmission).getUTCFullYear()
    : '2020';

  // Check connectivity and load cached data when modal opens
  useEffect(() => {
    if (visible) {
      checkConnectivityAndCache();
    }
  }, [visible]);

  const checkConnectivityAndCache = async () => {
    const online = await qrCacheService.isOnline();
    setIsOffline(!online);

    const cached = await qrCacheService.getCachedQRData();
    if (cached) {
      setCachedData(cached);
      setIsSaved(true);
      setLastSavedDate(qrCacheService.formatCachedDate(cached.cachedAt));
    }

    // If online and have member data, auto-save for offline use
    if (online && memberData?.memberCode) {
      await saveQRForOffline(false); // silent save
    }
  };

  const saveQRForOffline = async (showAlert: boolean = true) => {
    if (!memberData?.memberCode) {
      if (showAlert) {
        Alert.alert('Error', 'No hay datos del QR para guardar');
      }
      return;
    }

    const dataToCache: CachedQRData = {
      memberCode: memberData.memberCode.toString(),
      memberName: `${memberData.user?.name || ''} ${memberData.user?.lastName || ''}`.trim(),
      memberId: memberData.id?.toString() || '',
      cachedAt: new Date().toISOString(),
    };

    const saved = await qrCacheService.saveQRData(dataToCache);
    if (saved) {
      setIsSaved(true);
      setCachedData(dataToCache);
      setLastSavedDate(qrCacheService.formatCachedDate(dataToCache.cachedAt));
      if (showAlert) {
        Alert.alert(
          'QR Guardado',
          'Tu código QR ha sido guardado para uso offline. Podrás acceder a él sin conexión a internet.',
          [{ text: 'Entendido', style: 'default' }]
        );
      }
    } else if (showAlert) {
      Alert.alert('Error', 'No se pudo guardar el QR. Intenta de nuevo.');
    }
  };

  // Determine which data to display (live or cached)
  const displayMemberCode = isOffline && cachedData
    ? cachedData.memberCode
    : memberData?.memberCode;

  const displayMemberName = isOffline && cachedData
    ? cachedData.memberName
    : `${memberData?.user?.name || 'Nombre'} ${memberData?.user?.lastName || 'del Socio'}`;

  return (
    <Modal
      visible={visible}
      title="MI QR DE ACCESO"
      onCancel={onClose}
      onConfirm={onClose}
      confirmText="Cerrar"
      showCancelButton={false}
      confirmButtonStyle={{
        width: '100%',
        paddingVertical: 14,
        backgroundColor: COLORS.gray400,
        borderRadius: 3,
        alignItems: 'center',
        marginHorizontal: -20,
        marginBottom: -20,
      }}
      confirmButtonTextStyle={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
      }}
      buttonsContainerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginHorizontal: 20,
        marginBottom: 20,
      }}
      contentStyle={{
        alignItems: 'center',
        padding: 10
      }}
    >
      {/* Offline indicator */}
      {isOffline && (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FEF3C7',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          marginBottom: 10,
        }}>
          <Ionicons name="cloud-offline-outline" size={16} color="#D97706" />
          <Text style={{ marginLeft: 6, color: '#D97706', fontSize: 12, fontWeight: '600' }}>
            Modo Offline
          </Text>
        </View>
      )}

      {/* Componente QR real con el memberCode del socio */}
      <QRCodeComponent
        size={200}
        memberCode={displayMemberCode}
      />

      {/* Nombre del socio en negrita */}
      <Text style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.gray800,
        marginBottom: 5,
        marginTop: 15,
      }}>
        {displayMemberName}
      </Text>

      {/* Tipo de socio y ID */}
      <Text style={{
        fontSize: 13,
        fontWeight: '500',
        color: COLORS.gray500,
        textAlign: 'center',
        letterSpacing: 0.5,
        marginBottom: 10,
      }}>
        SOCIO TITULAR · #{displayMemberCode || memberData?.id}
      </Text>

      {/* Save for offline button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isSaved ? '#D1FAE5' : COLORS.primary,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 20,
          marginBottom: 12,
        }}
        onPress={() => saveQRForOffline(true)}
        disabled={isSaved}
      >
        <Ionicons
          name={isSaved ? 'checkmark-circle' : 'download-outline'}
          size={18}
          color={isSaved ? '#059669' : COLORS.white}
        />
        <Text style={{
          marginLeft: 8,
          color: isSaved ? '#059669' : COLORS.white,
          fontWeight: '600',
          fontSize: 14,
        }}>
          {isSaved ? 'Guardado para offline' : 'Guardar para uso offline'}
        </Text>
      </TouchableOpacity>

      {/* Last saved date */}
      {isSaved && lastSavedDate && (
        <Text style={{
          fontSize: 11,
          color: COLORS.gray500,
          marginBottom: 10,
        }}>
          Última actualización: {lastSavedDate}
        </Text>
      )}

      {/* Leyenda */}
      <Text style={{
        fontSize: 14,
        color: COLORS.gray700,
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Presenta este código en recepción o cualquier área del club
      </Text>
    </Modal>
  );
};

export default QRModal;