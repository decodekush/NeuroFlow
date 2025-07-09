import useActivityStore from '../store/useActivityStore';

const TabSwitchStatsCard = () => {
  const tabSwitchCount = useActivityStore((state) => state.tabSwitchCount);
  const tabAwayTime = useActivityStore((state) => state.tabAwayTime);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-2">🕵️ Tab Activity</h2>
      <p className="text-lg">Switched Tabs: <span className="font-semibold">{tabSwitchCount}</span> times</p>
      <p className="text-lg">Away Time: <span className="font-semibold">{tabAwayTime}</span> seconds</p>
      <p className="text-sm text-gray-500">Based on tab visibility changes.</p>
    </div>
  );
};

export default TabSwitchStatsCard;
