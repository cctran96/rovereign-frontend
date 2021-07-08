import React from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"

const Home = () => {
    const image = useSelector(state => state.images.imageSrc)

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
                </div>
            </div>
        </div>
    )
}

export default Home

const array = [
    "Choose from 3 classes.",
    "Go on your journey.",
    "Encounter tough monsters.",
    "Level up and collect items.",
    "Upgrade your character.",
    "Rule this world.",
]

const textVar = idx => {
    let arr = [0, 0, 0, 0, 0, 0, 0]
    let tmp = idx
    while (tmp >= 0) {
        idx % 2 === 0 ? arr[tmp] = -1000 : arr[tmp] = 1000
        tmp -= 1
    }
    return {x: arr, transition: {duration: 2, repeat: Infinity, repeatDelay: 5}}
}