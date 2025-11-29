import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { File } from '../../interfaces';
import styles from './Style';

interface FileListProps {
  files: File[];
  onDownload: (fileId: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDownload }) => {
  return (
    <View style={styles.container}>
      {files.map((file) => (
        <View key={file.id} style={styles.fileCard}>
          <View style={styles.fileInfo}>
            <View style={styles.fileIconContainer}>
              <Ionicons
                name="document-outline"
                size={24}
                color="#10B981"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.fileName} numberOfLines={2}>{file.name}</Text>
              {file.description ? (
                <Text style={styles.fileDescription} numberOfLines={10}>{file.description}</Text>
              ) : null}
              {file.type ? (
                <Text style={styles.fileType}>{file.type.toUpperCase()}</Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => onDownload(file.id)}
          >
            <Ionicons name="download-outline" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default FileList;