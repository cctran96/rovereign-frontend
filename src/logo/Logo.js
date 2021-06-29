import React from 'react'
import { motion } from 'framer-motion'

const Logo = () => {
    return (
        <div className="ani-logo">
            <motion.svg variants={SvgVar} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 470" height="60vh" initial="start" animate="end">
                <motion.g id="Layer_2" data-name="Layer 2">
                    <motion.path variants={outerTopVar} d="M152.8,225V44.4l150,86.8l-0.1,1.5c-34.1-12.4-66.9-10.7-97.9,8.6s-46.9,48.2-50.6,84.3L152.8,225z"/>
                    <motion.path variants={outerBotVar} d="M153,419.6V239l1.2-0.5c3.8,36.3,19.6,65.2,50.8,84.5s64.2,20.8,98.4,8.1l0.1,1.7L153,419.6z"/>
                    <motion.path variants={outerRightVar} d="M325.6,318.3c27.4-21.5,42.3-49.6,43-84.3s-13.3-63.4-40.1-86c3-0.5,139,77,149,84.6l-150.8,86.9L325.6,318.3z"/>
                </motion.g>
                <motion.g id="Layer_1" data-name="Layer 1" variants={fillVar}>
                    <motion.path variants={innerVar} d="M343.5,220.8c-10.3,0-20.3,0-30.2,0c-1.6,0-2.3-0.6-2.7-2.3c-5.4-20.1-18.5-32.8-38.6-37.2
                    c-16.6-3.6-31.6,0.8-44.3,12.5c-11.7,10.8-17,24.5-15.9,40.1c1.2,16.8,9.2,30.1,23.6,39.2c8.7,5.7,19.1,8.3,29.5,7.5
                    c15.1-1.1,27.5-7.5,36.9-19.6c4.3-5.5,7.4-11.9,8.9-18.7c0.4-1.5,1-2.1,2.5-2.1h30.3c-2.9,35-33,70.1-76.3,72.6
                    c-47.9,2.8-84.9-33-87.5-77.1c-2.8-47.9,33.2-84.8,77.1-87.5C303.7,145.3,339.3,180.9,343.5,220.8z"/>
                </motion.g>
            </motion.svg>
        </div>
    )
}

export default Logo

const fillVar = {
    start: {fill: "none"},
    end: {
        fill: "cadetblue",
        transition: {
            delay: 2.1,
            ease: "easeIn",
            duration: 1.4
        }
    }
}

const innerVar = {
    start: {
        rotate: 0,
        opacity: 0,
        stroke: "#dcffe8",
        strokeWidth: "4px",
        pathLength: 0,
    },
    end: {
        rotate: 360,
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2
        }
    }
}

const outerTopVar = {
    start : {
        y: -2000,
        x: -2000,
        opacity: 0,
        stroke: "#dcffe8",
        strokeWidth: "4px",
        pathLength: 0,
    },
    end: {
        y: 0,
        x: 0,
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            ease: "easeInOut"
        }
    }
}

const outerBotVar = {
    start : {
        y: 2000,
        x: -2000,
        opacity: 0,
        stroke: "#dcffe8",
        strokeWidth: "4px",
        pathLength: 0,
    },
    end: {
        y: 0,
        x:0,
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            ease: "easeInOut"
        }
    }
}

const outerRightVar = {
    start : {
        x: 5000,
        opacity: 0,
        stroke: "#dcffe8",
        strokeWidth: "4px",
        pathLength: 0,
    },
    end: {
        x: 0,
        opacity: 1,
        pathLength: 1,
        transition: {
            duration: 2,
            ease: "easeInOut"
        }
    }
}

const SvgVar = {
    start: {
        opacity: 1
    },
    end: {
        opacity: 0,
        transition: {
            delay: 2,
            duration: 1,
            ease: "easeInOut"
        }
    }
}