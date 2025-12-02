import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../../../shared/components/Button';
import { COLORS } from '../../../shared/theme/colors';
import NotificationCard from '../components/NotificationCard';
import SearchBar from '../components/SearchBar';
import { useDebounce } from '../hooks/useDebounce';
import { useNotificationStore } from '../store';
import styles from './Style';

const NotificationsScreen: React.FC = () => {
  const {
    notifications,
    loading,
    error,
    search,
    pagination,
    fetchNotifications,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
    updateSearch,
  } = useNotificationStore();

  const initialLoadCompleted = useRef(false);

  // Debounce the search input to avoid too many API calls
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // Only fetch if this is not the initial load or if search has changed after initial load
    if (initialLoadCompleted.current) {
      // Fetch notifications when search changes (after initial load)
      fetchNotifications(1, debouncedSearch);
    } else {
      // Mark that the initial load has been completed
      initialLoadCompleted.current = true;
      // Fetch notifications on initial mount with current search (which could be empty)
      fetchNotifications(1, search);
    }
  }, [debouncedSearch]);

  // Show error if there's an error
  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error',
        error,
        [
          {
            text: 'Aceptar',
            style: 'default'
          }
        ]
      );
    }
  }, [error]);

  // Function to handle search input changes
  const handleSearchChange = (text: string) => {
    updateSearch(text);
  };

  // Function to get visible page numbers for pagination
  const getVisiblePages = () => {
    const total = pagination.totalPages;
    const current = pagination.page;
    const maxVisible = 6;

    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    let start = current - Math.floor(maxVisible / 2);
    if (start < 1) start = 1;

    let end = start + maxVisible - 1;
    if (end > total) {
      end = total;
      start = end - maxVisible + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.headerTitle}>Notificaciones</Text>
              <Text style={styles.headerSubtitle}>Mantente al día con las últimas noticias</Text>
            </View>
          </View>

          {/* Search Bar */}
          <SearchBar
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Buscar notificaciones..."
          />

          {/* Notifications List */}
          <View style={styles.notificationsList}>
            {loading && pagination.page === 1 ? (
              <View style={styles.loadingContainer}>
                <Text>Cargando notificaciones...</Text>
              </View>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
              ))
            ) : (
              <View style={styles.noNotificationsContainer}>
                <Text style={styles.noNotificationsText}>
                  {search ? 'No se encontraron notificaciones' : 'No hay notificaciones disponibles'}
                </Text>
              </View>
            )}
          </View>

          {/* Loading indicator for pagination */}
          {loading && pagination.page > 1 && (
            <View style={styles.loadingMoreContainer}>
              <Text style={styles.loadingMoreText}>Cargando más notificaciones...</Text>
            </View>
          )}

          {/* Pagination controls - only show if there are pages to display */}
          {pagination.totalPages > 1 && (
            <View style={styles.paginationControlsContainer}>
              <View style={styles.paginationRow}>
                <Button
                  icon={<Ionicons name="chevron-back" size={22} color={COLORS.primary} />}
                  variant="outline"
                  onPress={fetchPreviousPage}
                  disabled={pagination.page <= 1}
                  style={[
                    styles.paginationArrowButton,
                    pagination.page <= 1 && styles.paginationArrowButtonDisabled
                  ]}
                  titleStyle={[
                    styles.paginationArrowButtonText,
                    pagination.page <= 1 && styles.paginationArrowButtonTextDisabled
                  ]}
                />

                <View style={styles.pageNumbersContainer}>
                  {getVisiblePages().map(pageNum => (
                    <Button
                      key={pageNum}
                      text={pageNum.toString()}
                      variant="outline"
                      onPress={() => goToPage(pageNum)}
                      style={[
                        styles.pageNumberButton,
                        pageNum === pagination.page && styles.currentPageButton
                      ]}
                      titleStyle={[
                        styles.pageNumberButtonText,
                        pageNum === pagination.page && styles.currentPageButtonText
                      ]}
                    />
                  ))}
                </View>

                <Button
                  icon={<Ionicons name="chevron-forward" size={22} color={COLORS.primary} />}
                  variant="outline"
                  onPress={fetchNextPage}
                  disabled={pagination.page >= pagination.totalPages}
                  style={[
                    styles.paginationArrowButton,
                    pagination.page >= pagination.totalPages && styles.paginationArrowButtonDisabled
                  ]}
                  titleStyle={[
                    styles.paginationArrowButtonText,
                    pagination.page >= pagination.totalPages && styles.paginationArrowButtonTextDisabled
                  ]}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;