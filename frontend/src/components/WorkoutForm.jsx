import React, { useState } from "react";
import "./WorkoutForm.css"; // Import the CSS file for styling

const WorkoutForm = () => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    try {
      const response = await fetch("http://localhost:4000/api/workouts/", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        setTitle("");
        setLoad("");
        setReps("");
        setError(null);
        console.log("New workout added:", json);
      } else {
        setError(json.error);
      }
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3 className="create-title">Add a New Workout</h3>

      <label className="create-label">Exercise Title:</label>
      <input
        className="create-input"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label className="create-label">Load (in kg):</label>
      <input
        className="create-input"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label className="create-label">Reps:</label>
      <input
        className="create-input"
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      {error && <p className="error">Error: {error}</p>}

      <button className="create-button">Add Workout</button>
    </form>
  );
};

export default WorkoutForm;
