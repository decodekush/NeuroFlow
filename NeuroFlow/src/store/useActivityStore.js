import { create } from 'zustand';

const useActivityStore = create((set) => ({
  scrollSpeed: 0,
  idleTime: 0,
  tabSwitchCount: 0,
  tabAwayTime: 0,
  journalEntries: [],
  sessionDuration: 0,
  scoreHistory: [],
  
  setScrollSpeed: (speed) => set({ scrollSpeed: parseFloat(speed) }),
  setIdleTime: (time) => set({ idleTime: time }),
  addTabAwayTime: (sec) =>set((state) => ({ tabAwayTime: state.tabAwayTime + sec })),
  addJournalEntry: (entry) =>set((state) => ({journalEntries: [...state.journalEntries, entry],})),
  addScoreEntry: (entry) =>set((state) => ({scoreHistory: [...state.scoreHistory, entry],})),
  setSessionDuration: (time) => set({ sessionDuration: time }),
  addJournalEntry: (entry) =>set((state) => ({journalEntries: [...state.journalEntries, entry],})),
  setScrollSpeed: (speed) => set({ scrollSpeed: parseFloat(speed) }),
  setIdleTime: (time) => set({ idleTime: time }),
  incrementTabSwitch: () =>
  set((state) => ({ tabSwitchCount: state.tabSwitchCount + 1 })),
  addTabAwayTime: (seconds) =>
  set((state) => ({ tabAwayTime: state.tabAwayTime + seconds })),

}));

export default useActivityStore;
