import React, { useEffect, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';
import { MemberData } from '../../services/homeService';
import QRCodeComponent from '../QRCodeComponent';
import qrCacheService, { CachedQRData } from '../../services/qrCacheService';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

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
  const [isDownloading, setIsDownloading] = useState(false);
  const [lastDownloadDate, setLastDownloadDate] = useState<string | null>(null);
  const viewShotRef = useRef<ViewShot>(null);

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
      setCachedData(dataToCache);
    } else if (showAlert) {
      Alert.alert('Error', 'No se pudo guardar el QR. Intenta de nuevo.');
    }
  };

  const downloadQRCode = async () => {
    try {
      setIsDownloading(true);

      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permisos requeridos',
          'Necesitamos permiso para guardar imágenes en tu galería. Por favor, habilita los permisos en la configuración de tu dispositivo.',
          [{ text: 'Entendido', style: 'default' }]
        );
        setIsDownloading(false);
        return;
      }

      // Capture the QR code as image
      if (!viewShotRef.current) {
        Alert.alert('Error', 'No se pudo capturar el código QR');
        setIsDownloading(false);
        return;
      }

      const captureTarget = viewShotRef.current;
      if (!captureTarget) {
        Alert.alert('Error', 'No se pudo capturar el código QR');
        setIsDownloading(false);
        return;
      }
      const captureFn = captureTarget.capture;
      if (!captureFn) {
        Alert.alert('Error', 'No se pudo capturar el código QR');
        setIsDownloading(false);
        return;
      }
      const uri = await captureFn();

      // Generate filename with member info
      const memberName = displayMemberName.replace(/\s+/g, '_');
      const timestamp = new Date().getTime();
      const filename = `QR_${memberName}_${timestamp}.png`;

      // Move temporary capture into cache directory so media library can access it reliably
      const cachedFileUri = `${FileSystem.cacheDirectory}${filename}`;
      await FileSystem.copyAsync({ from: uri, to: cachedFileUri });

      try {
        const asset = await MediaLibrary.createAssetAsync(cachedFileUri);
        await MediaLibrary.createAlbumAsync('Campestre', asset, false);

        const downloadDate = new Date().toISOString();
        setLastDownloadDate(qrCacheService.formatCachedDate(downloadDate));

        Alert.alert(
          '¡Descarga exitosa!',
          'Tu código QR ha sido guardado en tu galería. Ahora puedes acceder a él sin necesidad de abrir la app.',
          [{ text: 'Entendido', style: 'default' }]
        );
      } catch (mediaError: any) {
        // console.error('Error saving QR to media library:', mediaError);
        // Alert.alert(
        //   'No se pudo guardar automáticamente',
        //   'Vamos a abrir el menú de compartir para que puedas guardar el QR manualmente o enviarlo a otro dispositivo.',
        //   [{ text: 'Entendido', style: 'default' }]
        // );

        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(cachedFileUri, {
            dialogTitle: 'Guardar código QR',
          });
        }
      }
    } catch (error: any) {
      console.error('Error downloading QR:', error);
      Alert.alert(
        'Error al descargar',
        error.message || 'No se pudo descargar el código QR. Por favor intenta de nuevo.',
        [{ text: 'Entendido', style: 'default' }]
      );
    } finally {
      setIsDownloading(false);
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

      {/* Componente QR real con el memberCode del socio - wrapped in ViewShot for capture */}
      <ViewShot
        ref={viewShotRef}
        options={{
          format: 'png',
          quality: 1.0,
          result: 'tmpfile',
        }}
        style={{
          backgroundColor: COLORS.white,
          padding: 20,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <QRCodeComponent
          size={200}
          memberCode={displayMemberCode}
        />
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: COLORS.gray800,
          marginTop: 12,
          textAlign: 'center',
        }}>
          {displayMemberName}
        </Text>
        <Text style={{
          fontSize: 12,
          fontWeight: '500',
          color: COLORS.gray500,
          textAlign: 'center',
          marginTop: 4,
        }}>
          SOCIO TITULAR · #{displayMemberCode || memberData?.id}
        </Text>
      </ViewShot>

      {/* Download QR button */}
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDownloading ? COLORS.gray300 : COLORS.primary,
          paddingHorizontal: 20,
          paddingVertical: 14,
          borderRadius: 24,
          marginTop: 20,
          marginBottom: 8,
          minWidth: 200,
          minHeight: 48,
          justifyContent: 'center',
        }}
        onPress={downloadQRCode}
        disabled={isDownloading}
      >
        <Ionicons
          name={isDownloading ? 'hourglass-outline' : 'download-outline'}
          size={20}
          color={COLORS.white}
        />
        <Text style={{
          marginLeft: 10,
          color: COLORS.white,
          fontWeight: '700',
          fontSize: 15,
        }}>
          {isDownloading ? 'Descargando...' : 'Descargar QR'}
        </Text>
      </TouchableOpacity>

      {/* Last download date */}
      {lastDownloadDate && (
        <Text style={{
          fontSize: 11,
          color: COLORS.gray500,
          marginBottom: 8,
        }}>
          Última descarga: {lastDownloadDate}
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