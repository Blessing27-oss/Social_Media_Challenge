import React, { useState, useEffect } from "react"

function LabMembers() {
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/lab-members")
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching lab members:", error))
  }, [])

  return (
    <div>
      <h2>Lab Members</h2>
      <div className="members-grid">
        {members.map((member) => (
          <div key={member._id} className="member-card">
            <img src={member.picture || "/placeholder.svg"} alt={member.name} width="200" height="200" />
            <h3>{member.name}</h3>
            <p>Year: {member.year}</p>
            <p>Major: {member.major}</p>
            <p>Home: {member.home}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LabMembers

