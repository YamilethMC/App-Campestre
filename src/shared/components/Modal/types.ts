import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface ModalProps {
  /**
   * Indica si el modal está visible
   */
  visible: boolean;
  /**
   * Título del modal
   */
  title?: string;
  /**
   * Contenido principal del modal
   */
  children: ReactNode;
  /**
   * Texto del botón de confirmación
   * @default 'Aceptar'
   */
  confirmText?: string;
  /**
   * Texto del botón de cancelar
   */
  cancelText?: string;
  /**
   * Función que se ejecuta al presionar el botón de confirmar
   */
  onConfirm?: () => void;
  /**
   * Función que se ejecuta al presionar el botón de cancelar
   */
  onCancel?: () => void;
  /**
   * Estilos personalizados para el contenedor del modal
   */
  containerStyle?: ViewStyle;
  /**
   * Estilos personalizados para el título
   */
  titleStyle?: TextStyle;
  /**
   * Estilos personalizados para el contenido
   */
  contentStyle?: ViewStyle;
  /**
   * Estilos personalizados para el contenedor de botones
   */
  buttonsContainerStyle?: ViewStyle;
  /**
   * Mostrar el botón de cancelar
   * @default true
   */
  showCancelButton?: boolean;
  /**
   * Deshabilitar el botón de confirmar
   * @default false
   */
  disableConfirmButton?: boolean;
}
