import useProductivityScore from "../hooks/useProductivityScore";

const ScoreCard = () => {
  const { focusScore, progressScore } = useProductivityScore();

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">📊 Productivity Scores</h2>
      <div className="text-lg">
        <p>🧠 Focus Score: <span className="font-semibold">{focusScore}</span>/100</p>
        <p>🚀 Progress Score: <span className="font-semibold">{progressScore}</span>/100</p>
      </div>
      <p className="text-sm text-gray-500 mt-2">Live data based on your session activity.</p>
    </div>
  );
};

export default ScoreCard;
