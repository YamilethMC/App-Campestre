import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../../../shared/components/Button';
import Card from '../../../../shared/components/Card';
import { COLORS } from '../../../../shared/theme/colors';
//import useMessages from '../../hooks/useMessages';
import styles from './Style';

interface Menu {
  id: string;
  name: string;
  description: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'drinks' | 'specials';
  uploadDate: string;
  fileSize: string;
  rating: number;
  isFeatured: boolean;
  image?: string;
}

interface MenuCardProps {
  menu: Menu;
  onDownloadPress: () => void;
  onViewPress: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({ menu, onDownloadPress, onViewPress }) => {
  //const { messages } = useMessages();
  return (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        {/* Menu Image Space */}
        <View style={styles.imageContainer}>
          {menu.image ? (
            <Image source={{ uri: menu.image }} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={40} color={COLORS.gray400} />
              <Text style={styles.placeholderText}>Imagen del menú</Text>
            </View>
          )}
          {/* Overlay View Icon */}
          <TouchableOpacity 
            style={styles.overlayViewButton} 
            onPress={onViewPress}
          >
            <Ionicons name="eye-outline" size={16} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        {/* Menu Info */}
        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.menuName} numberOfLines={2}>{menu.name}</Text>
            {menu.isFeatured && (
              <View style={styles.featuredTag}>
                <Ionicons name="star" size={12} color={COLORS.white} />
                <Text style={styles.featuredText}>Destacado</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.description} numberOfLines={2}>{menu.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.metaText}>{menu.uploadDate}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="document-text-outline" size={14} color={COLORS.gray500} />
              <Text style={styles.metaText}>{menu.fileSize}</Text>
            </View>
            
            <View style={styles.metaItem}>
              <Ionicons name="star" size={14} color={COLORS.warning} />
              <Text style={styles.metaText}>{menu.rating}</Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <Button
              text="Descargar"
              onPress={onDownloadPress}
              icon={<Ionicons name="download-outline" size={16} color={COLORS.white} />}
              style={styles.downloadButton}
              titleStyle={styles.buttonText}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

export default MenuCard;