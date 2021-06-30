import React, { useState } from "react"
import { motion } from "framer-motion"
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai/index.esm"

const Login = () => {
    const [showLogin, setShowLogin] = useState(true)
    const toggleLogin = () => setShowLogin(!showLogin)

    return (
        <div className="login-page">
            <motion.div className="login-container" animate={showLogin ? "login" : "signup"}>
                <motion.div 
                    className="form-container signup"
                    variants={signupVar}
                >
                    <h1>Welcome Aboard!</h1>
                    <form>
                        <div className="field-container">
                            <AiOutlineUser size={30}/>
                            <input name="username" placeholder="Username" required/>
                        </div>
                        <div className="field-container">
                            <AiOutlineLock size={30}/>
                            <input name="password" placeholder="Password"type="password" required/>
                        </div>
                        <div className="field-container">
                            <AiOutlineLock size={30}/>
                            <input name="confirm" placeholder="Confirm Password"type="password" required/>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                </motion.div>
                <motion.div 
                    className="form-container login"
                    variants={loginVar}
                >
                    <h1>Welcome Back!</h1>
                    <form>
                        <div className="field-container">
                            <AiOutlineUser size={30}/>
                            <input name="username" placeholder="Username" required/>
                        </div>
                        <div className="field-container">
                            <AiOutlineLock size={30}/>
                            <input name="password" placeholder="Password"type="password" required/>
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                </motion.div>
                <div className="overlay">
                    <motion.div className="left" variants={leftVar}>
                        <h2>Not a user?</h2>
                        <button onClick={toggleLogin}>Sign up</button>
                    </motion.div>
                    <motion.div className="right" variants={rightVar}>
                        <h2>Already a user?</h2>
                        <button onClick={toggleLogin}>Sign in</button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
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
    login: {
        opacity: 1,
        transition: {duration: 0.5, delay: 0.2}
    },
    signup: {
        opacity: 0,
        transition: {duration: 0.5, delay: 0.2}
    }
}

const rightVar = {
    login: {
        opacity: 0,
        transition: {duration: 0.5, delay: 0.2}
    },
    signup: {
        opacity: 1,
        transition: {duration: 0.5, delay: 0.2}
    }
}