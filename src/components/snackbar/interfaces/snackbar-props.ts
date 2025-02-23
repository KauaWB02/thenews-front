export interface SnackbarPropsInterface {
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
  onClose: () => void;
}
