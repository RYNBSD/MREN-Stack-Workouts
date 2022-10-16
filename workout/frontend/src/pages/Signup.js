import React, { useEffect, useState } from 'react'
import { useSignup } from '../hooks/useSignup';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom"

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    const { signup, isLoading, error } = useSignup();

    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect (() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);


    const handleSubmit = async e => {
        e.preventDefault();
        
        await signup(email, password);
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            
            <label>Email address:</label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />
            <label>Password:</label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />

            <button disabled={isLoading}>Sign up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Signup