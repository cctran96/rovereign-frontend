import React, { useEffect, useState } from "react"
import { debounce } from "../helpers/debounce"
import { NavLink } from "react-router-dom"
import { GoThreeBars } from "react-icons/go"
import { IoMdClose } from "react-icons/io"

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

const Navbar = () => {
    const [width, setWidth] = useState(getWidth())
    const [isOpen, setIsOpen] = useState(false)
    const [collapse, setCollapse] = useState(width < 700)
    const toggleNav = () => setIsOpen(!isOpen)
    
    const handleResize = debounce(() => {
        const screenWidth = window.innerWidth
        setCollapse(screenWidth < 700)
        setWidth(screenWidth)
        console.log(screenWidth)
    }, 150)

    useEffect(() => {
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [width, collapse, handleResize])

    return (
        <header className="navbar">
            <nav>
                <a href="/">
                    <div className="logo">

                    </div>
                </a>
                <ul className="navlinks">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/collection">Collection</NavLink></li>
                    <li><NavLink to="/play">Play</NavLink></li>
                    <li><NavLink to="/login">Login</NavLink></li>
                </ul>
                {collapse ? (isOpen ? <IoMdClose onClick={toggleNav} size={25}/> : <GoThreeBars onClick={toggleNav} size={25}/>) : null}
            </nav>
        </header>
    )
}

export default Navbar