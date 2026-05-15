import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">LedgerTurf</h1>
          <p className="text-gray-600">The premier turf booking platform for Dhaka.</p>
          <div className="mt-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <p className="text-sm text-gray-500">Phase 1: Setup Complete ✅</p>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
