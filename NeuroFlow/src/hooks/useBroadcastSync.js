import { useEffect } from 'react';
import useActivityStore from '../store/useActivityStore';

const useBroadcastSync = () => {
  const {
    scrollSpeed,
    idleTime,
    tabSwitchCount,
    tabAwayTime,
    journalEntries,
    setScrollSpeed,
    setIdleTime,
    incrementTabSwitch,
    addTabAwayTime,
    addJournalEntry,
  } = useActivityStore();

  useEffect(() => {
    const channel = new BroadcastChannel('neuroflow-sync');

    // Broadcast local changes
    const broadcast = () => {
      const payload = {
        scrollSpeed,
        idleTime,
        tabSwitchCount,
        tabAwayTime,
        journalEntries,
      };
      channel.postMessage(payload);
    };

    const interval = setInterval(broadcast, 5000); // sync every 5s

    // Listen to changes from other tabs
    channel.onmessage = (event) => {
      const data = event.data;

      if (typeof data.scrollSpeed === 'number') setScrollSpeed(data.scrollSpeed);
      if (typeof data.idleTime === 'number') setIdleTime(data.idleTime);
      if (typeof data.tabAwayTime === 'number') addTabAwayTime(data.tabAwayTime);
      if (typeof data.tabSwitchCount === 'number') incrementTabSwitch();

      if (Array.isArray(data.journalEntries)) {
        data.journalEntries.forEach((entry) => {
          addJournalEntry(entry);
        });
      }
    };

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, [
    scrollSpeed,
    idleTime,
    tabSwitchCount,
    tabAwayTime,
    journalEntries,
    setScrollSpeed,
    setIdleTime,
    incrementTabSwitch,
    addTabAwayTime,
    addJournalEntry,
  ]);
};

export default useBroadcastSync;
