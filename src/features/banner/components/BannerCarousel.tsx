import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Banner } from '../interfaces/Banner';

const { width } = Dimensions.get('window');

interface BannerCarouselProps {
  banners: Banner[];
  loading?: boolean;
  error?: string | null;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, loading = false, error = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false);
  const autoPlayInterval = useRef<number | NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (banners.length > 0) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % banners.length;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, 10000);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [banners.length]);

  const handleBannerPress = (banner: Banner) => {
    setSelectedBanner(banner);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBanner(null);
  };

  const handleScrollBegin = () => {
    isScrolling.current = true;
  };

  const handleScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const newCurrentIndex = Math.round(contentOffset / width);
    setCurrentIndex(newCurrentIndex);
    isScrolling.current = false;
  };

  const scrollToIndex = (index: number) => {
    if (scrollViewRef.current && banners.length > 0) {
      scrollViewRef.current.scrollTo({
        x: index * width,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando banners...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error al cargar banners: {error}</Text>
      </View>
    );
  }

  if (!banners || banners.length === 0) {
    return null; // Don't render anything if no banners
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={handleScrollBegin}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
        snapToInterval={width}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContainer}
      >
        {banners.map((banner, index) => (
          <TouchableOpacity 
            key={banner.id} 
            style={[styles.bannerContainer, { width }]}
            activeOpacity={0.9}
            onPress={() => handleBannerPress(banner)}
          >
            {banner.image ? (
              <Image
                source={{
                  uri: banner.image.startsWith('http')
                    ? banner.image
                    : `data:image/jpeg;base64,${banner.image}`
                }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Imagen no disponible</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  loadingContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
  },
  errorContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff0f0',
  },
  scrollContainer: {
    // Add padding to prevent content from being cut off
  },
  bannerContainer: {
    height: 220,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: COLORS.gray100,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalImage: {
    width: '100%',
    height: 200,
  },
  modalTextContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  modalDetails: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  modalDetailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  modalDetailValue: {
    fontSize: 14,
    color: '#666',
  },
});

export default BannerCarousel;