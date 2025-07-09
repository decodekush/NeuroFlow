import { useEffect } from 'react';
import useActivityStore from '../store/useActivityStore';

const useSessionTimer = () => {
  const setSessionDuration = useActivityStore((state) => state.setSessionDuration);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const seconds = Math.floor((now - startTime) / 1000);
      setSessionDuration(seconds);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useSessionTimer;
