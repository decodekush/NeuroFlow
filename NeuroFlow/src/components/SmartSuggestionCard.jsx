import { useEffect, useState } from 'react';
import useActivityStore from '../store/useActivityStore';
import axios from 'axios';

const SmartSuggestionCard = () => {
  const {
    idleTime,
    scrollSpeed,
    tabSwitchCount,
    journalEntries,
    sessionDuration,
  } = useActivityStore();

  const [suggestion, setSuggestion] = useState('Analyzing your behavior...');

  const generatePrompt = () => {
    return `
Based on the following digital behavior stats, give a short, practical suggestion (2 lines max) to improve focus or reduce burnout:

- Idle Time: ${idleTime} sec
- Scroll Speed: ${scrollSpeed}
- Tab Switches: ${tabSwitchCount}
- Journal Entries: ${journalEntries.length}
- Session Duration: ${sessionDuration} sec
`;
  };

  const fetchSuggestion = async () => {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: generatePrompt() }],
          max_tokens: 50,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const reply = res.data.choices[0].message.content;
      setSuggestion(reply);
    } catch (err) {
      console.error(err);
      setSuggestion('You seem to be getting distracted. Try a 5-min focus session.');
    }
  };

useEffect(() => {
  const timeout = setTimeout(() => {
    fetchSuggestion();
  }, 8000); // delay by 8 seconds

  return () => clearTimeout(timeout);
}, [idleTime, scrollSpeed, tabSwitchCount, journalEntries.length, sessionDuration]);


  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-2">💡 AI Suggestion</h2>
      <p className="text-gray-800 text-base whitespace-pre-wrap">{suggestion}</p>
      <p className="text-xs text-gray-500 mt-2">Generated based on your current session.</p>
    </div>
  );
};

export default SmartSuggestionCard;
