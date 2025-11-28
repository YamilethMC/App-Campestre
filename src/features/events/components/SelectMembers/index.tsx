import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Modal as RNModal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../../../shared/components/Button/Button';
import Search from '../../../../shared/components/Search/Search';
import { COLORS } from '../../../../shared/theme/colors';
import { useEvents } from '../../hooks/useEvents';
import { Guest, Member } from '../../interfaces/eventInterface';
import Modal from '../../../../shared/components/Modal/Modal';

import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  SelectMembers: { eventId: string };
  Events: undefined;
};

type SelectMembersRouteProp = RouteProp<RootStackParamList, 'SelectMembers'>;
type SelectMembersNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SelectMembers'>;

interface SelectMembersProps {
  route: SelectMembersRouteProp;
  navigation: SelectMembersNavigationProp;
}

const SelectMembers: React.FC<SelectMembersProps> = ({ route, navigation }) => {
  const { eventId } = route.params;
  const {
    members,
    memberLoading: loading,
    memberError: error,
    selectedMember,
    selectedGuests,
    searchTerm,
    setSearchTerm,
    fetchMembers,
    fetchMemberDetails,
    selectMember,
    toggleGuestSelection,
    registerForEventWithMembers: registerForEvent
  } = useEvents();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (searchTerm !== undefined) {
      fetchMembers(searchTerm);
    }
  }, [searchTerm, fetchMembers]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  const handleMemberSelect = async (member: Member) => {
    selectMember(member);
    try {
      await fetchMemberDetails(member.id);
    } catch (err) {
      // Error is handled in the hook
    }
  };

  const handleRegister = async () => {
    if (!selectedMember || selectedGuests.length === 0) {
      Alert.alert('Error', 'Debes seleccionar al menos un participante');
      return;
    }

    setShowConfirmationModal(true);
  };

  const confirmRegistration = async () => {
    if (!selectedMember) return;

    setIsRegistering(true);
    setShowConfirmationModal(false);

    try {
      const result = await registerForEvent(
        eventId,
        selectedMember.id,
        selectedGuests.length
      );

      if (result.success) {
        navigation.goBack();
      } else {
        if (result.error) {
          Alert.alert('Error', result.error);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
    } finally {
      setIsRegistering(false);
    }
  };

  const renderMember = ({ item }: { item: Member }) => (
    <TouchableOpacity
      style={[
        styles.memberItem,
        selectedMember?.id === item.id && styles.selectedMemberItem
      ]}
      onPress={() => handleMemberSelect(item)}
    >
      <Text style={styles.memberCode}>
        {item.memberCode ? `#${item.memberCode}` : 'Sin código'}
      </Text>
      <Text style={styles.memberName}>
        {item.name} {item.lastName}
      </Text>
    </TouchableOpacity>
  );

  interface FlatListItem {
    type: 'header' | 'search' | 'error' | 'loading' | 'members' | 'noresults' | 'selectedmember';
    data?: any;
  }

  const renderGuest = ({ item }: { item: Guest }) => {
    const isSelected = selectedGuests.some(g => g.id === item.id);
    return (
      <TouchableOpacity
        style={styles.guestItem}
        onPress={() => toggleGuestSelection(item)}
      >
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={isSelected ? "checkbox" : "square-outline"}
            size={24}
            color={COLORS.primary}
          />
        </View>
        <Text style={styles.guestName}>
          {item.name} {item.lastName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { type: 'header' } as FlatListItem,
          { type: 'search' } as FlatListItem,
          { type: 'error' } as FlatListItem,
          { type: 'loading' } as FlatListItem,
          { type: 'members', data: members },
          { type: 'noresults' } as FlatListItem,
          { type: 'selectedmember' } as FlatListItem
        ]}
        renderItem={({ item }: { item: FlatListItem }) => {
          switch (item.type) {
            case 'header':
              return (
                <View style={styles.header}>
                  <View style={styles.headerContent}>
                    <Text style={styles.title}>Seleccionar participantes</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
                      <Ionicons name="close" size={24} color={COLORS.gray700} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.subtitle}>Busca y selecciona un socio y sus invitados</Text>
                </View>
              );
            case 'search':
              return (
                <View style={styles.searchContainer}>
                  <Search
                    placeholder="Buscar socio por nombre..."
                    onSearch={handleSearch}
                    inputStyle={styles.searchInput}
                  />
                </View>
              );
            case 'error':
              return error ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null;
            case 'loading':
              return (loading && !members.length) ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                  <Text style={styles.loadingText}>Cargando socios...</Text>
                </View>
              ) : null;
            case 'members':
              return item.data && item.data.length > 0 ? (
                <View style={{ paddingHorizontal: 20 }}>
                  <Text style={styles.sectionTitle}>Socios encontrados</Text>
                  <FlatList
                    data={item.data}
                    renderItem={renderMember}
                    keyExtractor={member => member.id.toString()}
                    style={styles.membersList}
                    showsVerticalScrollIndicator={false}
                    maxToRenderPerBatch={3}
                    windowSize={5}
                    scrollEnabled={false} // Disable internal scrolling since parent FlatList handles it
                    nestedScrollEnabled={false}
                  />
                </View>
              ) : null;
            case 'noresults':
              return (!loading && searchTerm && members.length === 0) ? (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>No se encontraron socios</Text>
                </View>
              ) : null;
            case 'selectedmember':
              if (!selectedMember) return null;
              return (
                <View style={styles.selectionContainer}>
                  <Text style={styles.sectionTitle}>Seleccionar participantes</Text>
                  <View style={styles.selectedMemberContainer}>
                    <TouchableOpacity
                      style={styles.guestItem}
                      onPress={() => toggleGuestSelection({
                        id: selectedMember.id,
                        name: selectedMember.name,
                        lastName: selectedMember.lastName
                      })}
                    >
                      <View style={styles.checkboxContainer}>
                        <Ionicons
                          name={selectedGuests.some(g => g.id === selectedMember.id) ? "checkbox" : "square-outline"}
                          size={24}
                          color={COLORS.primary}
                        />
                      </View>
                      <Text style={styles.guestName}>
                        {selectedMember.name} {selectedMember.lastName}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {selectedMember.guests.length > 0 ? (
                    <View style={styles.guestsContainer}>
                      <Text style={styles.subTitle}>Invitados:</Text>
                      <FlatList
                        data={selectedMember.guests}
                        renderItem={renderGuest}
                        keyExtractor={guest => guest.id.toString()}
                        style={styles.guestsList}
                        showsVerticalScrollIndicator={false}
                        maxToRenderPerBatch={3}
                        windowSize={5}
                        scrollEnabled={false} // Disable internal scrolling since parent FlatList handles it
                        nestedScrollEnabled={false}
                      />
                    </View>
                  ) : (
                    <View style={styles.noGuestsContainer}>
                      <Text style={styles.noGuestsText}>Este socio no tiene invitados</Text>
                    </View>
                  )}

                  <View style={styles.selectionSummary}>
                    <Text style={styles.selectionSummaryText}>
                      Participantes seleccionados: {selectedGuests.length}
                    </Text>
                  </View>
                </View>
              );
            default:
              return <View />;
          }
        }}
        keyExtractor={(item, index) => `${item.type}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 150 }} // Add padding to account for fixed buttons
        scrollEventThrottle={16}
      />

      {/* Fixed button container that stays at bottom */}
      <View style={[styles.buttonContainer, { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: COLORS.white, zIndex: 10 }]}>
        <Button
          text="Cancelar"
          variant="outline"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        />
        <Button
          text="Guardar"
          variant="primary"
          onPress={handleRegister}
          disabled={selectedGuests.length === 0}
          style={styles.saveButton}
        />
      </View>

      <Modal
        visible={showConfirmationModal}
        title="Confirmar registro"
        confirmText="Aceptar"
        cancelText="Cancelar"
        onConfirm={confirmRegistration}
        onCancel={() => setShowConfirmationModal(false)}
      >
        <Text style={styles.modalText}>
          ¿Estás seguro de que deseas registrar {selectedGuests.length} participante(s) para este evento?
        </Text>
      </Modal>

      {isRegistering && (
        <RNModal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={() => {}} // Disable close on back button
        >
          <View style={styles.processingOverlay}>
            <View style={styles.processingModalContent}>
              <ActivityIndicator size="large" color={COLORS.primary} />
              <Text style={styles.processingText}>Registrando...</Text>
            </View>
          </View>
        </RNModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray900,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.gray600,
  },
  closeButton: {
    padding: 5,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.gray800,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray700,
    marginBottom: 10,
  },
  membersList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.gray200,
  },
  selectedMemberItem: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  memberCode: {
    fontSize: 14,
    color: COLORS.gray600,
    marginRight: 10,
    minWidth: 80,
  },
  memberName: {
    fontSize: 16,
    color: COLORS.gray800,
    flex: 1,
  },
  selectionContainer: {
    marginTop: 10,
  },
  selectedMemberContainer: {
    marginBottom: 15,
  },
  guestsContainer: {
    marginTop: 10,
  },
  guestsList: {
    maxHeight: 200,
  },
  guestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  guestName: {
    fontSize: 16,
    color: COLORS.gray800,
    flex: 1,
  },
  noResultsContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 16,
    color: COLORS.gray600,
  },
  noGuestsContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noGuestsText: {
    fontSize: 16,
    color: COLORS.gray600,
  },
  selectionSummary: {
    alignItems: 'center',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
    marginTop: 15,
  },
  selectionSummaryText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray800,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    flex: 1,
    marginLeft: 10,
  },
  errorContainer: {
    padding: 15,
    backgroundColor: COLORS.error + '20',
    borderRadius: 8,
    marginBottom: 15,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.gray600,
  },
  modalText: {
    fontSize: 16,
    color: COLORS.gray800,
    textAlign: 'center',
    marginBottom: 20,
  },
  processingContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  processingText: {
    marginTop: 15,
    fontSize: 16,
    color: COLORS.gray800,
  },
  processingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingModalContent: {
    backgroundColor: COLORS.white,
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
});

export default SelectMembers;