import { useEffect, useRef } from 'react';
import useActivityStore from '../store/useActivityStore';

const useTabSwitchTracker = () => {
  const incrementTabSwitch = useActivityStore((state) => state.incrementTabSwitch);
  const addTabAwayTime = useActivityStore((state) => state.addTabAwayTime);
  const leaveTimeRef = useRef(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        leaveTimeRef.current = Date.now(); // Tab is hidden
      } else {
        // Tab became visible again
        if (leaveTimeRef.current) {
          const returnTime = Date.now();
          const awayDuration = Math.floor((returnTime - leaveTimeRef.current) / 1000);
          addTabAwayTime(awayDuration);
          incrementTabSwitch();
          leaveTimeRef.current = null;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);
};

export default useTabSwitchTracker;
