interface AlertProps {
  message: string;
  type?: 'error' | 'success' | 'warning';
  visible: boolean;
  onClose?: () => void;
}

export default AlertProps;
