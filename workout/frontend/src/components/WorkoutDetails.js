import React from 'react'

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ id, load, reps, title, createdAt }) => {

  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`http://127.0.0.1:5000/api/workouts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })

    const json = await response.json()

    if (response.ok) {
      dispatch({
        type: 'DELETE_WORKOUT',
        payload: json
      })
    }

  }

  return (
    <div className="workout-details">
        <h4>{title}</h4>
        <p>
            <strong>Load (kg): </strong> {load}
        </p>
        <p>
            <strong>Reps: </strong> {reps}
        </p>
        <p>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</p>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails