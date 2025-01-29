import React, { useState, useEffect } from "react"
import { Bar, Pie } from "react-chartjs-2"
//import { Panel } from "rsuite";  // Importing Card and Text components from RSuite
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js"
import { getLabMemberYears, getLabMembersMajors, getFavoriteThings, getMentorsStatus, getAgeDistribution} from "../stats.controller"
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function Statistics() {
  const [yearData, setYearData] = useState({})
  const [majorData, setMajorData] = useState({})
  const [favoriteThingsData, setFavoriteThingsData] = useState({})
  const [mentorStatusData, setMentorStatusData] = useState({})
  const [ageDistributionData, setAgeDistributionData] = useState({})

  useEffect(() => {
    getLabMemberYears((data) => {
        setYearData(data)
    });

    getLabMembersMajors((data) => {
        setMajorData(data)
    });

    getFavoriteThings((data) => {
        setFavoriteThingsData(data)
    });

    getMentorsStatus((data) => {
        setMentorStatusData(data)
    });

    getAgeDistribution((data) => {
        setAgeDistributionData(data)
    });

   },[])

  

  const yearChartData = {
    labels: Object.keys(yearData),
    datasets: [
      {
        label: "Members by Year",
        data: Object.values(yearData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  }

  const majorChartData = {
    labels: Object.keys(majorData),
    datasets: [
      {
        label: "Members by Major",
        data: Object.values(majorData),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  }

  const mentorStatusChartData = {
    labels: ["Mentors", "Non-Mentors"],
    datasets: [
      {
        data: [mentorStatusData.mentors, mentorStatusData.nonMentors],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 206, 86, 0.6)"],
      },
    ],
  }

  const ageDistributionChartData = {
    labels: Object.keys(ageDistributionData),
    datasets: [
      {
        label: "Age Distribution",
        data: Object.values(ageDistributionData),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  }

  return (
    <div className="statistics">
      <h2>Lab Member Statistics</h2>

      <div className="chart">
        <h3>Members by Graduation Year</h3>
        <Bar data={yearChartData} />
      </div>

      <div className="chart">
        <h3>Members by Major</h3>
        <Bar data={majorChartData} />
      </div>

      <div className="chart">
        <h3>Mentor Status</h3>
        <Pie data={mentorStatusChartData} />
      </div>

      <div className="chart">
        <h3>Age Distribution</h3>
        <Bar data={ageDistributionChartData} />
      </div>

      <div className="favorite-things">
        <h3>Top Favorite Things</h3>
        <ul>
          {Object.entries(favoriteThingsData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([thing, count]) => (
              <li key={thing}>
                {thing}: {count}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default Statistics

