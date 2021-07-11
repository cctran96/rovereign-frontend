import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateChatBox } from "../actions/menuAction"
import { motion } from "framer-motion"

const Shop = () => {
    const dispatch = useDispatch()
    let sellers = useSelector(state => state.images.imageSrc.sellers)

    useEffect(() => {
        dispatch(updateChatBox([{Kyle: "Welcome back to Amazen."}]))
    }, [])

    // Objects for each map
    const obj = {
        
    }

    return (
        <motion.div 
            className="introduction" 
            style={{backgroundColor: "gray"}} 
            initial="start" 
            animate="end"
            variants={fadeIn}
        >
            <div className="seller" style={{backgroundImage: `url(${sellers[0]})`}}/>
        </motion.div>
    )
}

export default Shop

const fadeIn = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 1, ease: "easeInOut"}}
}