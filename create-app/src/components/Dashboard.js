import React, { useState, useEffect } from "react"
import { Bar, Pie, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PieElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PieElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
)

function Dashboard() {
  const [userStats, setUserStats] = useState(null)
  const [postStats, setPostStats] = useState(null)
  const [activityStats, setActivityStats] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/api/stats/users")
      .then((res) => res.json())
      .then((data) => setUserStats(data))

    fetch("http://localhost:3001/api/stats/posts")
      .then((res) => res.json())
      .then((data) => setPostStats(data))

    fetch("http://localhost:3001/api/stats/activity?range=week")
      .then((res) => res.json())
      .then((data) => setActivityStats(data))

    fetch("http://localhost:3001/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data))
  }, [])

  if (!userStats || !postStats || !activityStats || !weather) {
    return <div>Loading...</div>
  }

  const ageDistributionData = {
    labels: Object.keys(userStats.ageDistribution),
    datasets: [
      {
        label: "Users",
        data: Object.values(userStats.ageDistribution),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const postActivityData = {
    labels: Object.keys(activityStats),
    datasets: [
      {
        label: "Posts",
        data: Object.values(activityStats),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }

  const weatherData = {
    labels: Object.keys(weather),
    datasets: [
      {
        label: "Temperature",
        data: Object.values(weather).map((w) => w.temperature),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>User Statistics</h2>
          <p>Total Users: {userStats.totalUsers}</p>
          <p>Average Age: {userStats.averageAge.toFixed(2)}</p>
          <Pie data={ageDistributionData} options={{ responsive: true }} />
        </div>
        <div className="stat-card">
          <h2>Post Statistics</h2>
          <p>Total Posts: {postStats.totalPosts}</p>
          <p>Total Likes: {postStats.totalLikes}</p>
          <p>Average Likes per Post: {postStats.averageLikesPerPost.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h2>Post Activity (Weekly)</h2>
          <Line data={postActivityData} options={{ responsive: true }} />
        </div>
        <div className="stat-card">
          <h2>Weather</h2>
          <Bar data={weatherData} options={{ responsive: true }} />
          <div className="weather-conditions">
            {Object.entries(weather).map(([location, data]) => (
              <p key={location}>
                {location}: {data.condition}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

