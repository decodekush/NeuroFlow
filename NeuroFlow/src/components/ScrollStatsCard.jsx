
import useActivityStore from '../store/useActivityStore';

const ScrollStatsCard = () => {
  const scrollSpeed = useActivityStore((state) => state.scrollSpeed);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-2">📜 Scroll Tracking</h2>
      <p className="text-lg">
        Scroll Speed: <span className="font-semibold">{scrollSpeed}</span> px/ms
      </p>
      <p className="text-sm text-gray-500">Live scroll behavior monitoring...</p>
    </div>
  );
};

export default ScrollStatsCard;
