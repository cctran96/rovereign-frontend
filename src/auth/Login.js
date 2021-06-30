import React, { useState } from "react"
import { motion } from "framer-motion"
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai/index.esm"

const usersURL = "http://localhost:3000/api/v1/users"

const Login = () => {
    // Displays either login form or signup form
    const [showLogin, setShowLogin] = useState(true)
    
    // Controlled forms for both login and signup
    const [loginForm, setLoginForm] = useState({username: "", password: ""})
    const [signupForm, setSignUpForm] = useState({username: "", password: "", confirm: ""})
    
    const handleLoginChange = e => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const handleSignupChange = e => {
        setSignUpForm({...signupForm, [e.target.name]: e.target.value})
    }

    // Switches between login/signup and clears form
    const toggleLogin = () => {
        setShowLogin(!showLogin)
        setLoginForm({username: "", password: ""})
        setSignUpForm({username: "", password: "", confirm: ""})
    }

    const sendAuth = body => {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        }
        fetch(usersURL, config)
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
    }

    const handleSubmitCredentials = e => {
        e.preventDefault()
        if (e.target.className === "signup-form") {
            
        } else {

        }
    }

    return (
        <motion.div className="login-page" initial="start" animate="end" variants={pageVar}>
            <motion.div className="login-container" animate={showLogin ? "login" : "signup"}>
                <motion.div 
                    className="form-container signup"
                    variants={signupVar}
                >
                    <h1>Welcome Aboard!</h1>
                    <form className="signup-form" onSubmit={handleSubmitCredentials}>
                        <div className="field-container">
                            <AiOutlineUser size={30}/>
                            <input
                                onChange={handleSignupChange}
                                name="username" 
                                placeholder="Username" 
                                value={signupForm.username} 
                                required
                            />
                        </div>
                        <div className="field-container">
                            <AiOutlineLock size={30}/>
                            <input 
                                onChange={handleSignupChange}
                                name="password" 
                                placeholder="Password"
                                type="password" 
                                value={signupForm.password} 
                                required
                            />
                        </div>
                        <div className="field-container">
                            <AiOutlineLock size={30}/>
                            <input 
                                onChange={handleSignupChange}
                                name="confirm" 
                                placeholder="Confirm Password"
                                type="password" 
                                value={signupForm.confirm} 
                                required
                            />
                        </div>
                        <button type="submit">SIGN UP</button>
                    </form>
                </motion.div>
                <motion.div 
                    className="form-container login"
                    variants={loginVar}
                >
                    <h1>Welcome Back!</h1>
                    <form className="login-form" onSubmit={handleSubmitCredentials}>
                        <div className="field-container">
                            <AiOutlineUser size={30}/>
                            <input
                                onChange={handleLoginChange}
                                name="username" 
                                placeholder="Username" 
                                value={loginForm.username} 
                                required
                            />
                        </div>
                        <div className="field-container">
                            <AiOutlineLock size={30}/>
                            <input
                                onChange={handleLoginChange}
                                name="password" 
                                placeholder="Password"
                                type="password" 
                                value={loginForm.password} 
                                required
                            />
                        </div>
                        <button type="submit">SIGN IN</button>
                    </form>
                </motion.div>
                <div className="overlay">
                    <motion.div className="left" variants={leftVar}>
                        <h2>Not a user?</h2>
                        <button onClick={toggleLogin}>SIGN UP</button>
                    </motion.div>
                    <motion.div className="right" variants={rightVar}>
                        <h2>Already a user?</h2>
                        <button onClick={toggleLogin}>SIGN IN</button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Login

const loginVar = {
    login: {
        opacity: 1,
        zIndex: 1,
        x: 0,
        transition: {duration: 0.5}
    },
    signup: {
        opacity: 0,
        zIndex: 0,
        x: "-100%",
        transition: {duration: 0.5}
    }
}

const signupVar = {
    login: {
        opacity: 0,
        zIndex: 0,
        x: "100%",
        transition: {duration: 0.5}
    },
    signup: {
        opacity: 1,
        zIndex: 1,
        x: 0,
        transition: {duration: 0.5}
    }
}

const leftVar = {
    login: {opacity: 1, transition: {duration: 0.5, delay: 0.2}},
    signup: {opacity: 0, transition: {duration: 0.5, delay: 0.2}}
}

const rightVar = {
    login: {opacity: 0, transition: {duration: 0.5, delay: 0.2}},
    signup: {opacity: 1, transition: {duration: 0.5, delay: 0.2}}
}

const pageVar ={ 
    start: {opacity: 0, y: -100},
    end: {opacity: 1, y: 0, transition: {duration: 0.5}}
}