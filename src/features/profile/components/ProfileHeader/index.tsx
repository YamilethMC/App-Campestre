import React from 'react';
import { Image, Text, View } from 'react-native';
import useMessages from '../../hooks/useMessages';
import { userProfile } from '../../interfaces/interfaces';
import { styles } from './Style';

const ProfileHeader: React.FC<userProfile> = ({
  name,
  lastName,
  id,
  memberCode,
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
        <Text style={styles.name}>
          {name} {lastName}
        </Text>
        {/*<Text style={styles.memberId}>Código: {memberCode}</Text>*/}
        <View style={styles.row}>
          <Text style={styles.membershipType}>
            {membershipType} {memberCode}
          </Text>
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
