import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
const Home = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/workouts/"); // Prepend with 'http://' and specify the correct port
        if (response.ok) {
          const json = await response.json();
          setWorkouts(json);
        }
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      {" "}
      <WorkoutForm />
      <div className="workouts">
        
        {workouts.map((workout) => (
          <p key={workout._id}>
          <div className="workoutDetails">  <WorkoutDetails key={workout._id} workout={workout} /></div>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Home;
