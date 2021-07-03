import React, { useState } from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

const CreateCharacter = ({showCreation}) => {
    const [sprite, setSprite] = useState(null)
    let image = useSelector(state => state.images.imageSrc)

    const handleSpriteChange = e => {
        setSprite(image[e.target.id].find(img => img.includes("idle")))
    }

    return (
        <div className="confirm-overlay" style={{display: showCreation ? "block" : "none"}}>
            <motion.div className="creation-container" variants={creationBoxVar} animate={showCreation ? "show" : "hidden"}>
                <h1>Choose a class</h1>
                <div className="class-names">
                    <h2 id="spearman" onClick={handleSpriteChange}>Knight</h2>
                    <h2 id="crusader" onClick={handleSpriteChange}>Wizard</h2>
                    <h2 id="hero" onClick={handleSpriteChange}>Archer</h2>
                </div>
                <div className="creation-info">
                    <div className="creation-sprite" style={{backgroundImage: sprite ? `url(${sprite})` : null}}/>
                    <div className="creation-stats">
                        {/* {
                            playerStats.map((key, idx) => {
                                return (
                                    <div className="stat" key={idx}>
                                        <b>{key.toUpperCase()}: </b>
                                        <p>{stats[key]}</p>
                                    </div>
                            )
                            })
                        } */}
                    </div>
                </div>
                <div className="creation-buttons">
                    <button>NEVERMIND</button>
                    <button>CREATE</button>
                </div>
            </motion.div>
        </div>
    )
}

export default CreateCharacter

const creationBoxVar = {
    show: {
        opacity: 1, 
        y: 0, 
        transition: {
            type: "spring",
            bounce: 0
        }
    },
    hidden: {
        opacity: 0, y: -1000}
}