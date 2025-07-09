import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import useActivityStore from '../store/useActivityStore';

const ScoreChart = () => {
  const scoreHistory = useActivityStore((state) => state.scoreHistory);

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md h-[400px]">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">📈 Score Trend</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={scoreHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="focusScore" stroke="#6366f1" name="Focus Score" />
          <Line type="monotone" dataKey="progressScore" stroke="#10b981" name="Progress Score" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
