import { useEffect, useState } from 'react';
import { setSnackbarHandler } from '../../services/apiService';

const Snackbar = () => {
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    setSnackbarHandler((message: string, type: 'success' | 'error') => {
      setSnackbar({ isVisible: true, message, type });
      setTimeout(() => setSnackbar({ isVisible: false, message: '', type }), 3000);
    });
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 px-4 py-3 rounded-lg shadow-md transition-opacity duration-300
      ${snackbar.isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
      ${snackbar.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
    `}>
      {snackbar.message}
    </div>
  );
};

export default Snackbar;
