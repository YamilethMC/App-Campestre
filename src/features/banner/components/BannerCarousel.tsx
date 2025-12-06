import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Banner } from '../interfaces/Banner';

const { width } = Dimensions.get('window');

interface BannerCarouselProps {
  banners: Banner[];
  loading?: boolean;
  error?: string | null;
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ banners, loading = false, error = null }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollViewOffset, setScrollViewOffset] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

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

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffset / width);
    setCurrentIndex(currentIndex);
    setScrollViewOffset(contentOffset);
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
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={width}
        snapToAlignment="start"
        contentContainerStyle={styles.scrollContainer}
      >
        {banners.map((banner, index) => (
          <View key={banner.id} style={[styles.bannerContainer, { width }]}>
            {banner.image ? (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${banner.image}` }} 
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
          onPress={goToPrev}
          disabled={banners.length <= 1}
        >
          <Ionicons 
            name="chevron-back" 
            size={24} 
            color={banners.length <= 1 ? '#ccc' : '#fff'} 
          />
        </TouchableOpacity>

        {/* Indicators */}
        <View style={styles.indicatorsContainer}>
          {banners.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.indicator,
                { backgroundColor: index === currentIndex ? '#fff' : 'rgba(255,255,255,0.5)' }
              ]}
              onPress={() => scrollToIndex(index)}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity 
          style={styles.navButton} 
          onPress={goToNext}
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
  },
  bannerImage: {
    width: '100%',
    height: '100%',
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
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    color: '#fff',
    fontSize: 14,
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