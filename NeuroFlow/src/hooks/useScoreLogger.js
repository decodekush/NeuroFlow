import { useEffect } from 'react';
import useProductivityScore from './useProductivityScore';
import useActivityStore from '../store/useActivityStore';

const useScoreLogger = () => {
  const { focusScore, progressScore } = useProductivityScore();
  const addScoreEntry = useActivityStore((state) => state.addScoreEntry);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      addScoreEntry({ focusScore, progressScore, timestamp });
    }, 5000); // Every 5 seconds (tweak as needed)

    return () => clearInterval(interval);
  }, [focusScore, progressScore]);
};

export default useScoreLogger;
