import { useEffect, useRef } from 'react';
import useActivityStore from '../store/useActivityStore';

const useIdleTracker = (idleDelay = 60000) => {
  const setIdleTime = useActivityStore((state) => state.setIdleTime);
  const idleTimer = useRef(null);
  const idleStartTime = useRef(null);

  const resetIdle = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (idleStartTime.current) {
      const now = Date.now();
      const elapsed = Math.floor((now - idleStartTime.current) / 1000);
      setIdleTime((prev) => prev + elapsed);
      idleStartTime.current = null;
    }

    idleTimer.current = setTimeout(() => {
      idleStartTime.current = Date.now();
    }, idleDelay);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll'];

    events.forEach((e) => window.addEventListener(e, resetIdle));
    resetIdle(); // Initialize on mount

    return () => {
      events.forEach((e) => window.removeEventListener(e, resetIdle));
      clearTimeout(idleTimer.current);
    };
  }, []);
};

export default useIdleTracker;
