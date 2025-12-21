import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Banner } from '../interfaces/Banner';

const { width } = Dimensions.get('window');

interface BannerCarouselProps {
  banners: Banner[];
  loading?: boolean;
  error?: string | null;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({
  banners,
  loading = false,
  error = null,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const isScrolling = useRef(false); // Para saber si el usuario está deslizando
  const autoPlayInterval = useRef<number | NodeJS.Timeout | null>(null);

  // Auto-rotate banners every 30 seconds
  useEffect(() => {
    if (banners.length > 1) {
      autoPlayInterval.current = setInterval(() => {
        goToNext();
      }, 30000); // 30 seconds
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [banners.length]);

  const goToNext = () => {
    if (banners.length > 0) {
      setCurrentIndex(prevIndex => (prevIndex + 1) % banners.length);
    }
  };

  const goToPrev = () => {
    if (banners.length > 0) {
      setCurrentIndex(prevIndex => (prevIndex - 1 + banners.length) % banners.length);
    }
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
          <View key={banner.id} style={[styles.bannerContainer, { width }]}>
            {banner.image ? (
              <Image
                source={{
                  uri: banner.image.startsWith('http')
                    ? banner.image
                    : `data:image/jpeg;base64,${banner.image}`,
                }}
                style={styles.bannerImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Imagen no disponible</Text>
              </View>
            )}
            <View style={styles.bannerContent}>
              <Text style={styles.title}>{banner.title}</Text>
              <Text style={styles.description}>{banner.description}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Navigation Controls */}
      <View style={styles.navigationContainer}>
        {/* Previous Button */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            const prevIndex = (currentIndex - 1 + banners.length) % banners.length;
            scrollToIndex(prevIndex);
          }}
          disabled={banners.length <= 1}
        >
          <Ionicons name="chevron-back" size={24} color={banners.length <= 1 ? '#ccc' : '#fff'} />
        </TouchableOpacity>

        {/* Indicators */}
        <View style={styles.indicatorsContainer}>
          {banners.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)' },
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            const nextIndex = (currentIndex + 1) % banners.length;
            scrollToIndex(nextIndex);
          }}
          disabled={banners.length <= 1}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={banners.length <= 1 ? '#ccc' : '#fff'}
          />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#f0f0f0',
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
    height: 180,
    position: 'relative',
    width: width, // Aseguramos que el contenedor tenga el ancho correcto
    overflow: 'hidden', // Asegura que nada se desborde del contenedor
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover', // Asegura que la imagen cubra todo el contenedor manteniendo proporciones
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  bannerContent: {
    position: 'absolute',
    bottom: 0,
    left: '-2%', // Añade un pequeño margen en los lados
    right: '7%', // Añade un pequeño margen en los lados
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
    minHeight: 60, // Asegura un mínimo espacio para el texto
    maxWidth: '94%', // Limita el ancho máximo del contenido de texto
    alignSelf: 'center', // Centra el contenido horizontalmente
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  navButton: {
    padding: 8,
  },
  indicatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default BannerCarousel;
