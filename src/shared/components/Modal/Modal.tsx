import React from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from './Styles';
import { ModalProps } from './types';

/**
 * Componente Modal personalizado y reutilizable
 */
const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  children,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  containerStyle,
  titleStyle,
  contentStyle,
  buttonsContainerStyle,
  showCancelButton = true,
  disableConfirmButton = false,
}) => {
  if (!visible) return null;

  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel || (() => {})}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onCancel || (() => {})}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.container, containerStyle]}
          onPress={(e) => e.stopPropagation()}
        >
          {title && (
            <Text style={[styles.title, titleStyle]}>
              {title}
            </Text>
          )}
          
          <View style={[styles.content, contentStyle]}>
            {children}
          </View>

          <View style={[styles.buttonsContainer, buttonsContainerStyle]}>
            {showCancelButton && (
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onCancel}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  {cancelText}
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[
                styles.button,
                styles.confirmButton,
                disableConfirmButton && styles.disabledButton,
              ]}
              onPress={onConfirm}
              disabled={disableConfirmButton}
            >
              <Text style={styles.buttonText}>
                {confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
};

export default Modal;
