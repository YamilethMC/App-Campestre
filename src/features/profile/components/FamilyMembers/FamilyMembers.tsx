import React from 'react';
import { FlatList, ListRenderItem, Text, View, ViewStyle } from 'react-native';
import { styles } from './Style';

interface FamilyMember {
  id: string | number;
  name: string;
  relationship: string;
  age: number;
  isActive: boolean;
}

interface FamilyMembersProps {
  members: FamilyMember[];
  onAddMember?: () => void;
  style?: ViewStyle;
}

const FamilyMembers: React.FC<FamilyMembersProps> = ({
  members = [],
  onAddMember,
  style,
}) => {
  const renderItem: ListRenderItem<FamilyMember> = ({ item }) => (
    <View style={styles.memberItem}>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <View style={styles.memberDetails}>
          <Text style={styles.detailText}>{item.relationship}</Text>
          <Text style={styles.detailText}>• {item.age} años</Text>
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
          {item.isActive ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, style]}>
      <FlatList
        data={members}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay familiares registrados</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      {onAddMember && (
        <View style={styles.addButtonContainer}>
          <Text style={styles.addButton} onPress={onAddMember}>
            + Agregar familiar
          </Text>
        </View>
      )}
    </View>
  );
};

export default FamilyMembers;
