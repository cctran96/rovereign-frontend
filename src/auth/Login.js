import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai/index.esm"
import { fetchSignup, fetchLogin } from "../actions/accountActions"
import { useHistory } from "react-router-dom"

const Login = (props) => {
    // Displays either login form or signup form
    const [showLogin, setShowLogin] = useState(true)
    
    // Controlled forms for both login and signup
    const [loginForm, setLoginForm] = useState({username: "", password: ""})
    const [signupForm, setSignUpForm] = useState({username: "", password: "", confirm: ""})
    
    // Sets useDispatch and useHistory to a variable
    const dispatch = useDispatch()
    const history = useHistory()

    // Grab errors from state and parses it
    const errors = useSelector(state => state.user.errors)
    const findError = field => errors ? errors.find(obj => obj[field]) : null
    const errorList = errors ? errors.map(obj => Object.values(obj)) : null

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
        dispatch({ type: "ERROR", errors: false })
    }

    const handleSubmitCredentials = e => {
        e.preventDefault()
        if (e.target.className === "signup-form") {
            dispatch(fetchSignup(signupForm, history))
        } else {
            dispatch(fetchLogin(loginForm, history))
        }
    }

    return (
        <motion.div className="login-page" initial="start" animate="end" variants={pageVar}>
            <motion.div className="login-container" animate={showLogin ? "login" : "signup"}>
                <motion.div 
                    className="form-container signup"
                    variants={signupVar}
                >
                    <h1>Start Your Journey!</h1>
                    <form className="signup-form" onSubmit={handleSubmitCredentials}>
                        <div className={`field-container ${findError("username") ? "error" : null}`}>
                            <AiOutlineUser size={30}/>
                            <input
                                className={findError("username") ? "error" : null}
                                onChange={handleSignupChange}
                                name="username" 
                                placeholder="Username" 
                                value={signupForm.username} 
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className={`field-container ${findError("password") ? "error" : null}`}>
                            <AiOutlineLock size={30}/>
                            <input 
                                className={findError("password") ? "error" : null}
                                onChange={handleSignupChange}
                                name="password" 
                                placeholder="Password"
                                type="password" 
                                value={signupForm.password} 
                                required
                            />
                        </div>
                        <div className={`field-container ${findError("confirm") ? "error" : null}`}>
                            <AiOutlineLock size={30}/>
                            <input 
                                className={findError("confirm") ? "error" : null}
                                onChange={handleSignupChange}
                                name="confirm" 
                                placeholder="Confirm Password"
                                type="password" 
                                value={signupForm.confirm} 
                                required
                            />
                        </div>
                        <button type="submit">SIGN UP</button>
                        {   errorList ?
                            <motion.div className="error-container" variants={errorVar} initial="start" animate="end">
                                {errorList.map(error => <p>{error}</p>)}
                            </motion.div> : null
                        }
                    </form>
                </motion.div>
                <motion.div 
                    className="form-container login"
                    variants={loginVar}
                >
                    <h1>Continue Your Journey!</h1>
                    <form className="login-form" onSubmit={handleSubmitCredentials}>
                        <div className={`field-container ${findError("both") ? "error" : null}`}>
                            <AiOutlineUser size={30}/>
                            <input
                                className={findError("both") ? "error" : null}
                                onChange={handleLoginChange}
                                name="username" 
                                placeholder="Username" 
                                value={loginForm.username}
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className={`field-container ${findError("both") ? "error" : null}`}>
                            <AiOutlineLock size={30}/>
                            <input
                                className={findError("both") ? "error" : null}
                                onChange={handleLoginChange}
                                name="password" 
                                placeholder="Password"
                                type="password" 
                                value={loginForm.password} 
                                required
                            />
                        </div>
                        <button type="submit">SIGN IN</button>
                        {   errorList ?
                            <motion.div className="error-container" variants={errorVar} initial="start" animate="end">
                                {errorList.map((error, idx) => <p key={idx}>{error}</p>)}
                            </motion.div> : null
                        }
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

const pageVar = { 
    start: {opacity: 0, y: -100},
    end: {opacity: 1, y: 0, transition: {duration: 0.5}}
}

const errorVar = {
    start: {opacity: 0, y: 100},
    end: {opacity: 1, y: 0, transition: {duration: 0.5}}
}