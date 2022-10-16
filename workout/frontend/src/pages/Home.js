import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutsForm from '../components/WorkoutsForm';

import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { useNavigate } from "react-router-dom"

const Home = () => {

    const { workouts, dispatch } = useWorkoutsContext();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }

        const data = async () => {
            const response = await fetch("http://127.0.0.1:5000/api/workouts/", {
                headers: {
                    "Authorization": `Bearer ${user.token}`
                }
            });
        
            if (response.ok) {
                const json = await response.json();
                dispatch({
                    type: 'SET_WORKOUTS', 
                    payload: json
                });
            }
        }

        if (user) {
            data();
        }
    }, [workouts, dispatch, user]);

    if (!workouts) {
        if (workouts === null) {
            return "Error";
        }
        return "Loading";
    }
    
    return (
        <div className='home'>
            <div className="workouts">
                {
                    workouts && workouts?.map(dt => (
                        <WorkoutDetails 
                            key={dt._id}
                            id={dt._id}
                            title={dt.title}
                            reps={dt.reps}
                            load={dt.load}
                            createdAt={dt.createdAt}
                        />
                    ))
                }
            </div>
            <WorkoutsForm />
        </div>
    );
}

export default Home