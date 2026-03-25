import React from 'react';
import { FlatList, ListRenderItem, Text, View } from 'react-native';
import useMessages from '../../hooks/useMessages';
import { familyMembers, familyMembersProps } from '../../interfaces/interfaces';
import { styles } from './Style';

const FamilyMembers: React.FC<familyMembersProps> = ({
  members = [],
  onAddMember,
  style,
}) => {
  const { messages } = useMessages();
  const getRelationShip = (relationship: string) => {
    switch (relationship) {
      case 'SPOUSE':
        return 'CÓNYUGE';
      case 'CHILD':
        return 'HIJO/A';
      case 'PARENT':
        return 'PADRE/MADRE';
      case 'SIBLING':
        return 'HERMANO/A';
      case 'FRIEND':
        return 'AMIGO/A';
      case 'OTHER':
        return 'OTRO';
      case 'WIFE':
        return 'ESPOSA';
      case 'HUSBAND':
        return 'ESPOSO';
      case 'SON':
        return 'HIJO';
      case 'DAUGHTER':
        return 'HIJA';
      case 'FATHER':
        return 'PADRE';
      case 'MOTHER':
        return 'MADRE';
      case 'BROTHER':
        return 'HERMANO';
      case 'SISTER':
        return 'HERMANA';
      default:
        return relationship;
    }
  };
  const renderItem: ListRenderItem<familyMembers> = ({ item }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name} {item.lastName}</Text>
        <View style={styles.memberDetails}>
          <Text style={styles.detailText}>{getRelationShip(item.relationship)}</Text>
          {/*<Text style={styles.detailText}>• {item.age} {messages.FAMILY.AGE}</Text>*/}
        </View>
      </View>
      <View style={[
        styles.statusBadge,
        item.isActive ? styles.activeBadge : styles.inactiveBadge
      ]}>
        <Text style={[
          styles.statusText,
          item.isActive ? styles.activeText : styles.inactiveText
        ]}>
          {item.isActive ? messages.FAMILY.ACTIVE : messages.FAMILY.INACTIVE}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={members}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{messages.FAMILY.NO_FAMILYMEMBERS}</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      {/*{onAddMember && (
        <View style={styles.addButtonContainer}>
          <Text
            style={styles.addButton}
            onPress={onAddMember}>
            + {messages.FAMILY.ADD_MEMBER}
          </Text>
        </View>
      )}*/}
    </View>
  );
};

export default FamilyMembers;
