import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FiX, FiPlay } from "react-icons/fi/index.esm"
import { motion } from "framer-motion"
import { setDeletedCharacter, setCurrentCharacter } from "../actions/characterActions"

const CharacterCard = ({character, setShow, setShowCreation}) => {
    // Checks if button is being hovered for effect
    const [playHover, setPlayHover] = useState(false)
    const [deleteHover, setDeleteHover] = useState(false)

    // Destructure character object
    const {name, gold, level, experience, stats, role} = character

    // Set dispatch to variable and grab image source of character
    const dispatch = useDispatch()
    let image = useSelector(state => state.images.imageSrc[role])
    image = image ? image.find(img => img.includes("idle")) : null
    
    // Separates hp/mp keys from the other stats
    const playerStats = stats ? Object.keys(stats).filter(s => s !== "hp" && s !== "current_hp" && s !== "mp" && s !== "current_mp") : null

    // Change hp/mp bar color depending on current hp/mp
    const hpColor = () => {
        const health = stats.current_hp/stats.hp
        if (health <= 0.3) {
            return "red"
        } else if (health <= 0.7) {
            return "yellow"
        }
        return "green"
    }

    const mpColor = () => {
        const mana = stats.current_mp/stats.mp
        if (mana <= 0.3) {
            return "#4e4ec2"
        } else if (mana <= 0.7) {
            return "#1717be"
        }
        return "#01017e"
    }

    // Brings up confirmation before deleting character
    const storeDeletedCharacter = () => {
        dispatch(setDeletedCharacter(character))
        setShow(true)
    }

    // Sets the current character for play
    const storeSelectedCharacter = () => {
        dispatch(setCurrentCharacter(character))
    }

    return (
        <div className="character-card">
            { name ? 
                <>
                    <div className="image-container" style={{backgroundImage: `url(${image})`}}/>
                    <div className="stats-container">
                        <div className="stat-bars">
                            <div className="bar-border">
                                <div className="hp">
                                    <p>{stats.current_hp}/{stats.hp}</p>
                                </div>
                                <div className="hp-bar" style={{background: hpColor(), width: `${((stats.current_hp/stats.hp)*100)}%`}}/>
                            </div>
                            <div className="bar-border">
                                <div className="mp">
                                    <p>{stats.current_mp}/{stats.mp}</p>
                                </div>
                                <div className="mp-bar" style={{background: mpColor(), width: `${((stats.current_mp/stats.mp)*100)}%`}}/>
                            </div>
                        </div>
                        <div className="stat-table">
                            {
                                playerStats.map((key, idx) => {
                                    return (
                                        <div className="stat" key={idx}>
                                            <b>{key.toUpperCase()}: </b>
                                            <p>{stats[key]}</p>
                                        </div>
                                )
                                })
                            }
                        </div> 
                    </div>
                    <div className="info-container">
                        <h1>{name}</h1>
                        <div className="info">
                            <div className="stat">
                                <b>LEVEL: </b>
                                <p>{level}</p>
                            </div>
                            <div className="stat">
                                <b>EXP: </b>
                                <p>{experience}</p>
                            </div>
                            <div className="stat">
                                <b>GOLD: </b>
                                <p>{gold}</p>
                            </div>
                        </div>
                        <div className="select-buttons">
                            <motion.button
                                className="play-btn"
                                animate={playHover ? "effect" : "none"}
                                variants={playButtonVar}
                                onMouseEnter={() => setPlayHover(true)}
                                onMouseLeave={() => setPlayHover(false)}
                                onClick={storeSelectedCharacter}
                            >
                                <motion.p animate={playHover ? "effect" : "none"} variants={playTextVar}>PLAY</motion.p>
                                <motion.div className="svg" variants={playSvgVar} animate={playHover ? "effect" : "none"}>
                                    <FiPlay size={playHover ? 23 : 15}/>
                                </motion.div>
                            </motion.button>
                            <motion.button
                                className="delete-btn"
                                animate={deleteHover ? "effect" : "none"}
                                variants={deleteButtonVar}
                                onMouseEnter={() => setDeleteHover(true)}
                                onMouseLeave={() => setDeleteHover(false)}
                                onClick={storeDeletedCharacter}
                            >
                                <motion.p animate={deleteHover ? "effect" : "none"} variants={deleteTextVar}>DELETE</motion.p>
                                <motion.div className="svg" variants={deleteSvgVar} animate={deleteHover ? "effect" : "none"}>
                                    <FiX size={deleteHover ? 25 : 17}/>
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>
                </> : 
                <button className="create-button" onClick={() => setShowCreation(true)}>CREATE CHARACTER</button>
            }
        </div>
    )
}

export default CharacterCard

// Play Button Variants
const playButtonVar = {effect: {transition: {duration: 0.3}}}
const playTextVar = {effect: {opacity: 0}}
const playSvgVar = {effect: {x: "-35%", transition: {duration: 0.2}}}

// Delete Button Variants
const deleteButtonVar = {effect: {transition: {duration: 0.3}}}
const deleteTextVar = {effect: {opacity: 0}}
const deleteSvgVar = {effect: {x: "-35%", transition: {duration: 0.2}}}