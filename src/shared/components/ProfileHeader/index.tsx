import React from 'react';
import { Image, Text, View } from 'react-native';
import useMessages from '../../../features/profile/hooks/useMessages';
import { userProfile } from '../../../features/profile/interfaces/interfaces';
import { styles } from './Style';

const ProfileHeader: React.FC<userProfile> = ({
  name,
  id,
  membershipType,
  isActive = true,
  photoUrl,
  style,
}) => {
  const { messages } = useMessages();
  const avatar = photoUrl ? (
    <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
  ) : (
    <View style={styles.avatarPlaceholder}>
      <Text style={styles.avatarText}>{name?.charAt(0) ?? '?'}</Text>
    </View>
  );

  return (
    <View style={[styles.header, style]}>
      {avatar}
      <View style={styles.userInfo}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.memberId}>ID: {id}</Text>
        <View style={styles.row}>
          <Text style={styles.membershipType}>{membershipType}</Text>
          <View style={[styles.statusPill, isActive ? styles.active : styles.inactive]}>
            <Text style={[styles.statusText, isActive ? styles.activeText : styles.inactiveText]}>
              {isActive ? messages.HEADER.ACTIVE : messages.HEADER.INACTIVE}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;
