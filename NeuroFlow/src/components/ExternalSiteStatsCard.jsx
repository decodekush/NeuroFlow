import { useEffect, useState } from 'react';

const ExternalSiteStatsCard = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = () => {
      if (!window.chrome?.runtime?.sendMessage) {
        console.warn("Not running inside extension environment.");
        return;
      }

      try {
        window.chrome.runtime.sendMessage(
          { type: 'GET_BEHAVIOR_LOGS' },
          (response) => {
            if (response?.logs) {
              setLogs(response.logs);
            }
          }
        );
      } catch (e) {
        console.error("Could not fetch extension data:", e);
      }
    };

    fetchLogs();
  }, []);

  const grouped = logs.reduce((acc, log) => {
    const hostname = new URL(log.url).hostname;
    if (!acc[hostname]) acc[hostname] = { time: 0, scrolls: 0, visits: 0 };
    acc[hostname].time += log.timeSpent;
    acc[hostname].scrolls += log.scrollEvents;
    acc[hostname].visits += 1;
    return acc;
  }, {});

  const sortedSites = Object.entries(grouped).sort((a, b) => b[1].time - a[1].time);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">🌐 External Site Activity</h2>
      <ul className="text-sm">
        {sortedSites.map(([site, stats]) => (
          <li key={site} className="mb-2">
            <strong>{site}</strong>: ⏱ {stats.time}s, 📜 {stats.scrolls} scrolls, 🔁 {stats.visits} visits
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExternalSiteStatsCard;
