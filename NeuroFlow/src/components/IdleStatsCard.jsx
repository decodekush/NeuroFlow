import useActivityStore from "../store/useActivityStore";

const IdleStatsCard = () => {
  const idleTime = useActivityStore((state) => state.idleTime);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-2">😴 Idle Time</h2>
      <p className="text-lg">
        Total Idle Time: <span className="font-semibold">{idleTime}</span> seconds
      </p>
      <p className="text-sm text-gray-500">Based on inactivity from keyboard, mouse, and scroll.</p>
    </div>
  );
};

export default IdleStatsCard;
