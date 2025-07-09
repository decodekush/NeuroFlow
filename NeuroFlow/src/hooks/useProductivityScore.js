import useActivityStore from '../store/useActivityStore';
import { useMemo } from 'react';

const useProductivityScore = () => {
  const {
    scrollSpeed,
    idleTime,
    tabSwitchCount,
    sessionDuration,
    journalEntries,
  } = useActivityStore();

  const { focusScore, progressScore } = useMemo(() => {
    let focus = 100;
    let progress = 50;

    if (tabSwitchCount > 5) focus -= 15;
    if (idleTime > 60) focus -= 20;
    if (scrollSpeed > 1.2) focus -= 10;
    if (sessionDuration > 900) focus += 10;

    if (journalEntries.length > 0) focus += 10;

    focus = Math.max(0, Math.min(focus, 100));

    if (sessionDuration > 1200) progress += 20;
    if (idleTime < 30) progress += 10;

    const productiveMoods = journalEntries.filter(e => e.mood === 'focused').length;
    progress += productiveMoods * 5;

    progress = Math.max(0, Math.min(progress, 100));

    return { focusScore: focus, progressScore: progress };
  }, [scrollSpeed, idleTime, tabSwitchCount, sessionDuration, journalEntries]);

  return { focusScore, progressScore };
};

export default useProductivityScore;
