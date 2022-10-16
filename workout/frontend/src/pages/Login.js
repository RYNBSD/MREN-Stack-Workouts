import React, { useState, useEffect } from 'react'
import { useLogin } from '../hooks/useLogin';
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin();
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect (() => {
        if (user) {
            navigate("/");
        }
    }, [navigate, user]);

    const handleSubmit = async e => {
        e.preventDefault();
        
        await login(email, password); 
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log In</h3>
            
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

            <button disabled={isLoading}>Log In</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login