import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../../../shared/theme/colors';
import { Banner } from '../../../banner/interfaces/Banner';
import { MemberData } from '../../services/homeService';
import styles from './Style';

const { width } = Dimensions.get('window');

interface CustomHeaderProps {
  memberData: MemberData | null;
  banners: Banner[];
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ memberData, banners }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Carrusel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);
  const autoPlayInterval = useRef<number | NodeJS.Timeout | null>(null);
  
  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

  // Obtener iniciales del nombre
  const getInitials = (name?: string, lastName?: string) => {
    const firstInitial = name?.charAt(0)?.toUpperCase() || 'U';
    const lastInitial = lastName?.charAt(0)?.toUpperCase() || 'S';
    return firstInitial + lastInitial;
  };

  // Carrusel functions
  useEffect(() => {
    if (banners.length > 1) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % banners.length;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, 7000); // 5 segundos entre banners
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [banners.length]);

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current && banners.length > 0) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  const handleScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newCurrentIndex = Math.round(contentOffset / width);
    setCurrentIndex(newCurrentIndex);
    isScrolling.current = false;
  };

  const handleNotificationPress = () => {
    // Navegar al stack de More, luego a Notifications, pero resetear el tab después
    const parentNav = navigation.getParent();
    if (parentNav) {
      // Navegar a More stack con Notifications, luego volver al Home tab
      (parentNav as any).navigate('More', { 
        screen: 'Notifications',
        initial: false 
      });
    }
  };

  const handleBannerPress = (banner: Banner) => {
    setSelectedBanner(banner);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBanner(null);
  };

  const firstName = memberData?.user?.name || 'Usuario';
  const lastName = memberData?.user?.lastName || '';
  const initials = getInitials(firstName, lastName);
  const currentBanner = banners && banners.length > 0 ? banners[currentIndex] : null;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Carrusel de banners de fondo */}
      {banners && banners.length > 0 ? (
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScrollEnd}
          scrollEventThrottle={16}
          style={styles.bannerScroll}
        >
          {banners.map((banner, index) => (
            <View key={banner.id} style={[styles.bannerSlide, { width }]}>
              {banner.image ? (
                <Image
                  source={{
                    uri: banner.image.startsWith('http')
                      ? banner.image
                      : `data:image/jpeg;base64,${banner.image}`
                  }}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.primaryBackground} />
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.primaryBackground} />
      )}

      {/* Overlay oscuro para mejor legibilidad */}
      <View style={styles.overlay} />

      {/* Header content */}
      <View style={styles.headerContent}>
        {/* Sección izquierda: Iniciales y saludo */}
        <View style={styles.leftSection}>
          <View style={styles.initialsCircle}>
            <Text style={styles.initialsText}>{initials}</Text>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.welcomeText}>BIENVENIDO</Text>
            <Text style={styles.nameText}>Hola, {firstName}</Text>
          </View>
        </View>

        {/* Sección derecha: Campanita de notificaciones */}
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={handleNotificationPress}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Banner info card flotante (solo si hay banner) */}
      {currentBanner && (
        <TouchableOpacity 
          style={styles.bannerCard} 
          onPress={() => handleBannerPress(currentBanner)}
          activeOpacity={0.8}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconContainer}>
              <Ionicons name="megaphone-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.bannerTitle}>{currentBanner.title}</Text>
              {currentBanner.description && (
                <Text style={styles.bannerDescription} numberOfLines={10}>
                  {currentBanner.description}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}

      {/* Modal del banner reutilizado */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            
            {selectedBanner && (
              <>
                {selectedBanner.image && (
                  <Image
                    source={{
                      uri: selectedBanner.image.startsWith('http')
                        ? selectedBanner.image
                        : `data:image/jpeg;base64,${selectedBanner.image}`
                    }}
                    style={styles.modalImage}
                    resizeMode="cover"
                  />
                )}
                <View style={styles.modalTextContent}>
                  <Text style={styles.modalTitle}>{selectedBanner.title}</Text>
                  {selectedBanner.description && (
                    <Text style={styles.modalDescription}>{selectedBanner.description}</Text>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomHeader;
