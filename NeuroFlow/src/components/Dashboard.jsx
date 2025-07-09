import { Link } from 'react-router-dom'

// Hooks
import useScrollTracker from '../hooks/useScrollTracker'
import useIdleTracker from '../hooks/useIdleTracker'
import useTabSwitchTracker from '../hooks/useTabSwitchTracker'
import useSessionTimer from '../hooks/useSessionTimer'
import useScoreLogger from '../hooks/useScoreLogger'
import useBroadcastSync from '../hooks/useBroadcastSync'

// Components
import ScrollStatsCard from './ScrollStatsCard'
import IdleStatsCard from './IdleStatsCard'
import TabSwitchStatsCard from './TabSwitchStatsCard'
import JournalCard from './JournalCard'
import ScoreCard from './ScoreCard'
import ScoreChart from './ScoreChart'
import CognitiveBreakdownCard from './CognitiveBreakdownCard'
import SmartSuggestionCard from './SmartSuggestionCard'
import ExternalSiteStatsCard from './ExternalSiteStatsCard'

const Dashboard = () => {
  // Enable trackers and logging
  useScrollTracker()
  useIdleTracker()
  useTabSwitchTracker()
  useSessionTimer()
  useScoreLogger()
  useBroadcastSync()

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      {/* Header */}
      <header className="mb-10 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">NeuroFlow Dashboard</h1>
        <Link to="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
      </header>

      {/* Core Usage Tracking */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <ScoreCard />
        <ScrollStatsCard />
        <IdleStatsCard />
        <TabSwitchStatsCard />
        <JournalCard />
      </div>

      {/* Time & Score Trend */}
      <div className="mb-10">
        <ScoreChart />
      </div>

      {/* AI Breakdown + Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <CognitiveBreakdownCard />
        <SmartSuggestionCard />
      </div>

      {/* New: External Site Logs from Extension */}
      <div className="mb-10">
        <ExternalSiteStatsCard />
      </div>
    </div>
  )
}

export default Dashboard
