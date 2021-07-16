import React from "react"
import { motion } from "framer-motion"
import { GiWizardStaff, GiBroadsword, GiBowArrow } from "react-icons/gi/index.esm"

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-text">
                <h1>Rovereign</h1>
                <div>
                    {array.map((text, idx) => {
                        return (
                            <motion.h2 key={idx} animate={textVar(idx)}>{text}</motion.h2>
                        )
                    })}
                    <div
                    style={{
                        position: "relative", 
                        display: "flex", 
                        justifyContent: "center"
                    }}
                    >
                        <motion.div animate={svgVar(7)}>
                            <GiWizardStaff size={150} color="rgba(0, 0, 0, 0.4)"/>
                        </motion.div>
                        <motion.div animate={svgVar(8)}>
                            <GiBowArrow size={150} color="rgba(59, 35, 11, 0.4)"/>
                        </motion.div>
                        <motion.div animate={svgVar(9)}>
                            <GiBroadsword size={150} color="rgba(128, 128, 128, 0.4)"/>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home

const array = [
    "Choose from 3 classes.",
    "Explore different maps.",
    "Encounter tough monsters.",
    "Level up and collect items.",
    "Upgrade your character.",
    "Rule this world.",
]

const textVar = idx => {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let tmp = idx
    while (tmp >= 0) {
        idx % 2 === 0 ? arr[tmp] = -1000 : arr[tmp] = 1000
        tmp -= 1
    }
    return {x: arr, transition: {duration: 2, repeat: Infinity, repeatDelay: 5}}
}

const svgVar = idx => {
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let tmp = idx
    while (tmp >= 0) {
        arr[tmp] = 1000
        tmp -= 1
    }
    return {y: arr, transition: {duration: 2, repeat: Infinity, repeatDelay: 5}}
}