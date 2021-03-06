import React, { useState } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { logOutCharacter } from "../actions/characterActions"
import { toggleLogMenu } from "../actions/menuAction"
import { RiLogoutBoxLine } from "react-icons/ri/index.esm"
import { GrReturn } from "react-icons/gr/index.esm"

const LogOutMenu = () => {
    const show = useSelector(state => state.menu.logout)
    const dispatch = useDispatch()

    // Checks if button is being hovered for effect
    const [yesHover, setYesHover] = useState(false)
    const [noHover, setNoHover] = useState(false)

    return (
        <div className="confirm-overlay" style={{display: show ? "block" : "none"}}>
            <motion.div className="confirm-box" variants={confirmVar} animate={show ? "show" : "hidden"}>
                {   show ?
                    <>
                        <h1>Are you sure you want to sign off?</h1>
                        <div className="confirm-buttons">
                            <div className="return">
                                <motion.button
                                    animate={noHover ? "effect" : "none"}
                                    variants={noButtonVar}
                                    onMouseEnter={() => setNoHover(true)}
                                    onMouseLeave={() => setNoHover(false)}
                                    onClick={() => dispatch(toggleLogMenu())}
                                >
                                    <motion.p animate={noHover ? "effect" : "none"} variants={noTextVar}>RETURN</motion.p>
                                    <motion.div className="svg" variants={noSvgVar} animate={noHover ? "effect" : "none"}>
                                        <GrReturn size={noHover ? 25 : 17}/>
                                    </motion.div>
                                </motion.button>
                            </div>
                            <div className="delete">
                                <motion.button
                                    animate={yesHover ? "effect" : "none"}
                                    variants={yesButtonVar}
                                    onMouseEnter={() => setYesHover(true)}
                                    onMouseLeave={() => setYesHover(false)}
                                    onClick={() => dispatch(logOutCharacter())}
                                >
                                    <motion.p animate={yesHover ? "effect" : "none"} variants={yesTextVar}>SIGN OFF</motion.p>
                                    <motion.div className="svg" variants={yesSvgVar} animate={yesHover ? "effect" : "none"}>
                                        <RiLogoutBoxLine size={yesHover ? 25 : 17}/>
                                    </motion.div>
                                </motion.button>
                            </div>
                        </div>
                    </> : null 
                }
            </motion.div>
        </div>
    )
}

export default LogOutMenu

// Confirm Delete Variants
const yesButtonVar = {effect: {transition: {duration: 0.3}}}
const yesTextVar = {effect: {opacity: 0}}
const yesSvgVar = {effect: {x: "-35%", transition: {duration: 0.2}}}

// Return Variants
const noButtonVar = {effect: {transition: {duration: 0.3}}}
const noTextVar = {effect: {opacity: 0}}
const noSvgVar = {effect: {x: "-35%", transition: {duration: 0.2}}}

// Confirm Box Variant
const confirmVar = {
    show: {
        opacity: 1, 
        y: 0, 
        transition: {
            type: "spring",
            bounce: 0
        }
    },
    hidden: {
        opacity: 0, y: -700}
}