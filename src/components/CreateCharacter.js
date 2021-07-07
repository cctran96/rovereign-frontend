import React, { useState } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import { createCharacter } from "../actions/characterActions"
import { GrReturn, GrCheckmark } from "react-icons/gr/index.esm"

const CreateCharacter = ({showCreation, setShowCreation, characters}) => {
    // State for current selected sprite, stats, and class
    const [sprite, setSprite] = useState(null)
    const [stats, setStats] = useState(null)
    const [role, setRole] = useState(null)

    // State for character name
    const [name, setName] = useState("")

    // Checks if button is being hovered for effect
    const [returnHover, setReturnHover] = useState(false)
    const [createHover, setCreateHover] = useState(false)

    // Set dispatch to variable
    const dispatch = useDispatch()

    // Grabs image src, error message, and current user id from store
    let image = useSelector(state => state.images.imageSrc)
    let errors = useSelector(state => state.characters.errors)
    let userId = useSelector(state => state.user.user.id)

    // Set current sprite
    const handleCharacterChange = e => {
        setSprite(image[e.target.id].find(img => img.includes("idle")))
        setStats(baseStats[e.target.innerText])
        setRole(e.target.id)
    }

    // Closes the creation modal
    const closeCreationWindow = () => {
        setShowCreation(false)
        setSprite(null)
        setName("")
    }

    const handleCreateCharacter = e => {
        e.preventDefault()
        dispatch(createCharacter(userId, name, role, characters, closeCreationWindow))
    }

    return (
        <div className="confirm-overlay" style={{display: showCreation ? "block" : "none"}}>
            <motion.div className="creation-container" variants={creationBoxVar} animate={showCreation ? "show" : "hidden"}>
                <h1>Choose a class</h1>
                <div className="class-names">
                    <h2 id="magician" onClick={handleCharacterChange}>Wizard</h2>
                    <h2 id="spearman" onClick={handleCharacterChange}>Knight</h2>
                    <h2 id="hunter" onClick={handleCharacterChange}>Archer</h2>
                </div>
                <div className="creation-info">
                    {   sprite ? 
                        <>
                            <div className="creation-sprite" style={{backgroundImage: `url(${sprite})`}}/>
                            <div className="creation-stats">
                                {
                                    Object.keys(stats).map((key, idx) => {
                                        return (
                                            <div className="base-stats" key={idx}>
                                                <b>{key.toUpperCase()}: </b>
                                                <div className="bar-border" style={{width: "60%", position: "absolute", left: "22%"}}>
                                                    <div className="stat-bar" style={{width: stats[key] ? `${stats[key]}%` : 0}}/>
                                                </div>
                                                <p>{stats[key]}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </>
                        : null
                    }
                </div>
                <div className="creation-buttons">
                    <motion.button
                        className="return-btn"
                        animate={returnHover ? "effect" : "none"}
                        variants={returnButtonVar}
                        onMouseEnter={() => setReturnHover(true)}
                        onMouseLeave={() => setReturnHover(false)}
                        onClick={closeCreationWindow}
                    >
                        <motion.p animate={returnHover ? "effect" : "none"} variants={returnTextVar}>BACK</motion.p>
                        <motion.div className="svg" variants={returnSvgVar} animate={returnHover ? "effect" : "none"}>
                            <GrReturn size={returnHover ? 25 : 17}/>
                        </motion.div>
                    </motion.button>
                    {   sprite && name && name.length > 2 ?
                        <motion.button
                            className="create-btn"
                            animate={createHover ? "effect" : "none"}
                            variants={createButtonVar}
                            onMouseEnter={() => setCreateHover(true)}
                            onMouseLeave={() => setCreateHover(false)}
                            onClick={handleCreateCharacter}
                        >
                            <motion.p animate={createHover ? "effect" : "none"} variants={createTextVar}>CREATE</motion.p>
                            <motion.div className="svg" variants={createSvgVar} animate={createHover ? "effect" : "none"}>
                                <GrCheckmark size={createHover ? 23 : 15} style={{marginRight: "2px"}}/>
                            </motion.div>
                        </motion.button> : null
                    }
                    {   sprite ? 
                        <>
                            <form onSubmit={handleCreateCharacter}>
                                <label>Name</label>
                                <input onChange={e => setName(e.target.value)} value={name} placeholder="Display name"/>
                            </form> 
                            {errors ? 
                                <div className="creation-errors">
                                    {errors.map(e => <p>{e}</p>)}
                                </div> : null
                            }
                        </> : null
                    }
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

// Return Variants
const returnButtonVar = {effect: {transition: {duration: 0.3}}}
const returnTextVar = {effect: {opacity: 0}}
const returnSvgVar = {effect: {x: "-35%", transition: {duration: 0.2}}}

// Create Variants
const createButtonVar = {effect: {transition: {duration: 0.3}}}
const createTextVar = {effect: {opacity: 0}}
const createSvgVar = {effect: {x: "-35%", transition: {duration: 0.2}}}

// Base stats for the classes
const baseStats = {
    Knight: {hp: 50, mp: 25, str: 50, dex: 25, int: 0, cri: 1,spd: 25, def: 25},
    Wizard: {hp: 50, mp: 50, str: 0, dex: 0, int: 50, cri: 1,spd: 25, def: 25},
    Archer: {hp: 50, mp: 25, str: 0, dex: 50, int: 25, cri: 1,spd: 25, def: 25}
}