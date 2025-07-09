import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Navbar */}
      <header className="w-full py-4 px-6 bg-white shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">NeuroFlow</h1>
        <Link to="/dashboard" className="text-sm text-indigo-600 hover:underline">Start Tracking</Link>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-indigo-50 to-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Track your mind. Boost your focus.</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          NeuroFlow helps you understand your digital behavior, measure your cognitive load, and prevent burnout — all in real time.
        </p>
        <Link
          to="/dashboard"
          className="mt-8 inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-indigo-700 transition"
        >
          Start Tracking
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <h3 className="text-3xl font-semibold text-center mb-12">How It Works</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">📜 Scroll Behavior Tracking</h4>
            <p className="text-gray-600">Detect anxious scrolling, focus bursts, and interaction fatigue.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">📊 Productivity Scoring</h4>
            <p className="text-gray-600">Get cognitive load scores based on your digital behavior.</p>
          </div>
          <div className="bg-indigo-50 p-6 rounded-xl shadow hover:shadow-md transition">
            <h4 className="text-xl font-semibold mb-2">📝 Journaling & Reflection</h4>
            <p className="text-gray-600">Log your focus state, mood, and productivity insights.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t">
        NeuroFlow © 2025 · <a href="https://github.com/decodekush" className="hover:underline text-indigo-600">GitHub</a>
      </footer>
    </div>
  )
}

export default App
