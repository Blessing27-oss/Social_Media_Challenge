import React from "react"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import LabMembers from "./components/Dashboard"
import Statistics from "./components/Statistics"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/lab-members">Lab Members</Link>
            </li>
            <li>
              <Link to="/statistics">Statistics</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lab-members" element={<LabMembers />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </div>
    </Router>
  )
}

function Home() {
  return (
    <div>
      <h1>Welcome to the Lab Members Dashboard</h1>
      <p>Navigate to view lab members or statistics.</p>
    </div>
  )
}

export default App

