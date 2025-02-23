import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken, isTokenExpired, loggout } from '../services/authService';

const useAuthTimer = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token || isTokenExpired()) {
      navigate('/login');
      return;
    }

    try {
      const decodedToken = decodeToken();
      if (!decodedToken) {
        loggout();
        navigate('/login');
        return;
      }

      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      let timeRemaining = expirationTime - currentTime;

      if (timeRemaining <= 0) {
        loggout();
        navigate('/login');
      } else {
        setTimeLeft(timeRemaining);

        // Atualiza o tempo a cada segundo
        const interval = setInterval(() => {
          timeRemaining -= 1000;
          setTimeLeft(timeRemaining);

          if (timeRemaining <= 0) {
            clearInterval(interval);
            loggout();
            navigate('/login');
          }
        }, 1000);

        return () => clearInterval(interval);
      }
    } catch (error) {
      console.error('Erro ao decodificar JWT', error);
      loggout();
      navigate('/login');
    }
  }, [navigate]);

  return { timeLeft };
};

export default useAuthTimer;
