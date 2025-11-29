import React from 'react';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Search from '../../../shared/components/Search/Search';
import FileHeader from '../components/FileHeader';
import FileList from '../components/FileList';
import Button from '../../../shared/components/Button';
import { useFileActions } from '../hooks/useFileActions';
import { COLORS } from '../../../shared/theme/colors';
import styles from './Style';

const FilesContainer: React.FC = () => {
  const {
    files,
    loading,
    error,
    pagination,
    search,
    handleSearch,
    handleDownload,
    fetchNextPage,
    fetchPreviousPage,
    goToPage,
    getVisiblePages,
    refreshFiles
  } = useFileActions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <FileHeader
          title="Documentos y Reglamentos"
          description="Accede y descarga los documentos oficiales del club"
          icon="newspaper-outline"
        />

        <View style={styles.searchContainer}>
          <Search
            placeholder="Buscar documentos..."
            onSearch={handleSearch}
            debounceTime={500}
          />
        </View>

        <View style={styles.contentContainer}>
          {files.length > 0 ? (
            <FileList files={files} onDownload={handleDownload} />
          ) : loading ? (
            <View style={styles.loadingContainer}>
              <Text>Cargando documentos...</Text>
            </View>
          ) : (
            <View style={styles.noFilesContainer}>
              <Ionicons name="document-outline" size={60} color={COLORS.gray400} />
              <Text style={styles.noFilesText}>No se encontraron documentos</Text>
            </View>
          )}
        </View>

        {/* Loading indicator for pagination */}
        {loading && pagination.page > 1 && (
          <View style={styles.loadingMoreContainer}>
            <Text style={styles.loadingMoreText}>Cargando más documentos...</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default FilesContainer;