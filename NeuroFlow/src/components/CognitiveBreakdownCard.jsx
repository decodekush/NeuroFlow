import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import useActivityStore from '../store/useActivityStore';

const COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80'];

const CognitiveBreakdownCard = () => {
  const {
    idleTime,
    tabSwitchCount,
    scrollSpeed,
    journalEntries,
    sessionDuration,
  } = useActivityStore();

  // Scoring weight logic
  const idleScore = Math.min(idleTime / sessionDuration, 1) * 100 || 0;
  const tabSwitchScore = Math.min(tabSwitchCount / 10, 1) * 100;
  const scrollScore = Math.min(scrollSpeed / 2, 1) * 100;
  const journalScore = journalEntries.length === 0 ? 100 : 0;

  const data = [
    { name: 'Idle Time', value: idleScore },
    { name: 'Tab Switches', value: tabSwitchScore },
    { name: 'Anxious Scrolling', value: scrollScore },
    { name: 'Missing Journaling', value: journalScore },
  ];

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-md h-[400px]">
      <h2 className="text-xl font-bold text-indigo-600 mb-4">🧠 Cognitive Load Breakdown</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CognitiveBreakdownCard;
