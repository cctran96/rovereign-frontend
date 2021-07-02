import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { motion } from "framer-motion"
import { debounce } from "../helpers/debounce"
import { ReactComponent as Logo } from "../logo/Logo.svg"
import { GoThreeBars } from "react-icons/go"
import { IoMdClose } from "react-icons/io"

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const Navbar = () => {
    const [width, setWidth] = useState(getWidth())
    const [isOpen, setIsOpen] = useState(false)
    const [collapse, setCollapse] = useState(width < 750)
    const toggleNav = () => setIsOpen(!isOpen)
    
    // Grab state from store and sets useDispatch and useHistory to a variable
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    const history = useHistory()

    // Checks for resize of the screen to collapse the navbar
    const handleResize = debounce(() => {
        const screenWidth = window.innerWidth
        setCollapse(screenWidth < 750)
        setWidth(screenWidth)
        if (screenWidth > 750) setIsOpen(false)
    }, 100)

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [width, collapse, handleResize])

    // Closes nav menu when you click outside of the menu
    const handleCloseMenu = e => {
        if (e.target.className === ("nav-menu open")) toggleNav()
    }

    // Logs user out
    const handleLogout = () => {
        dispatch({ type: "LOGIN", user: false })
        localStorage.removeItem("jwt")
        history.replace("/login")
    }

    // Resets error state when changing routes
    const resetError = () => {
        dispatch({ type: "ERROR", errors: false })
    }

    return (
        <nav className="navbar">
            <a href="/">
                <div className="logo">
                    <Logo/>
                </div>
            </a>
                    <h1>{user ? `${user.username}` : null}</h1>
            {   collapse ? null :
                <ul className="navlinks">
                    <li><NavLink onClick={resetError} activeStyle={activeStyle} exact to="/">Home</NavLink></li>
                    <li><NavLink onClick={resetError} activeStyle={activeStyle} exact to="/collection">Collection</NavLink></li>
                    <li><NavLink onClick={resetError} activeStyle={activeStyle} exact to="/play">Play</NavLink></li>
                    <li>
                        {   user ?
                            <button onClick={handleLogout} href="#">Logout</button> :
                            <NavLink onClick={resetError} activeStyle={activeStyle} exact to="/login">Login</NavLink>
                        }
                    </li>
                </ul>
            }
            {   collapse ? 
                <motion.div className="open-button" animate={isOpen ? "open" : "closed"} variants={openVar}>
                    <GoThreeBars onClick={toggleNav} size={30}/>
                </motion.div> : null
            }
            <div 
                onClick={handleCloseMenu} 
                className={`nav-menu ${isOpen ? "open" : "closed"}`} 
                style={{display: isOpen ? "block" : "none"}}
            >
                <motion.div 
                    className="link-container" 
                    animate={isOpen ? "open" : "closed"}
                    variants={menuVar}
                >
                    <motion.div className="close-button" variants={closeVar}>
                        <IoMdClose onClick={toggleNav} size={35}/>
                    </motion.div>
                    <motion.ul className="menu-links" animate={isOpen ? "open" : "closed"}>
                        <motion.li variants={liVar(1)}>
                            <NavLink onClick={resetError} activeStyle={activeStyle} exact to="/">Home</NavLink>
                        </motion.li>
                        <motion.li variants={liVar(2)}>
                            <NavLink onClick={resetError} activeStyle={activeStyle} exact to="/collection">Collection</NavLink>
                        </motion.li>
                        <motion.li variants={liVar(3)}>
                            <NavLink onClick={resetError} activeStyle={activeStyle} exact to="/play">Play</NavLink>
                        </motion.li>
                        <motion.li variants={liVar(4)}>
                            {   user ?
                                <button onClick={handleLogout}>Logout</button> :
                                <NavLink activeStyle={activeStyle} exact to="/login">Login</NavLink>
                            }
                        </motion.li>
                    </motion.ul>
                </motion.div>
            </div>
        </nav>
    )
}

export default Navbar

const activeStyle = {
    fontWeight: "bold",
    color: "#add8e6",
    fontSize: "21px"
}

const openVar = {
    open: {x: 1000, opacity: 0},
    closed: {opacity: 1, x: 0, transition: {duration: 0.7}}
}

const closeVar = {
    open: {opacity: 1, x: 0, transition: {duration: 0.7}},
    closed: {opacity: 0, x: 1000}
}

const menuVar = {
    open: {
        opacity: 1, 
        x: 0, 
        transition: {
            type: "spring",
            bounce: 0
        }
    },
    closed: {
        opacity: 0, x: 1000}
}

const liVar = position => {
    return {
        open: {opacity: 1, x: 0, transition: {duration: 0.5, delay: 0.5 + position * 0.1}},
        closed: {opacity: 0, x: 500}
    }
}