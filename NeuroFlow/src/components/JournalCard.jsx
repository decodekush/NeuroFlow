import { useState } from 'react';
import useActivityStore from '../store/useActivityStore';

const JournalCard = () => {
  const [text, setText] = useState('');
  const [mood, setMood] = useState('focused');
  const addJournalEntry = useActivityStore((state) => state.addJournalEntry);
  const journalEntries = useActivityStore((state) => state.journalEntries);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const entry = {
      id: Date.now(),
      text,
      mood,
      timestamp: new Date().toLocaleString(),
    };

    addJournalEntry(entry);
    setText('');
    setMood('focused');
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">📝 Journal Entry</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={3}
          placeholder="Write your thoughts, distractions, or productivity notes..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Mood:</label>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="focused">Focused</option>
            <option value="distracted">Distracted</option>
            <option value="burned">Burned Out</option>
          </select>

          <button
            type="submit"
            className="ml-auto bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Save Entry
          </button>
        </div>
      </form>

      {/* Display Saved Entries */}
      {journalEntries.length > 0 && (
        <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
          {journalEntries.map((entry) => (
            <div key={entry.id} className="p-3 border rounded-md bg-indigo-50">
              <p className="text-sm text-gray-700">{entry.text}</p>
              <div className="text-xs text-gray-500 mt-1">
                <span className="capitalize">{entry.mood}</span> · {entry.timestamp}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JournalCard;
