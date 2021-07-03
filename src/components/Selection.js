import React, { useState } from "react"
import CharacterCard from "./CharacterCard"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { FiX } from "react-icons/fi/index.esm"
import { GrReturn } from "react-icons/gr/index.esm"
import { setDeletedCharacter, confirmDeleteCharacter } from "../actions/characterActions"
import CreateCharacter from "./CreateCharacter"

const Selection = () => {
    // Show/close confirm modal before deleting a character
    const [show, setShow] = useState(false)

    // Show/close character creation modal
    const [showCreation, setShowCreation] = useState(false)

    // Checks if button is being hovered for effect
    const [yesHover, setYesHover] = useState(false)
    const [noHover, setNoHover] = useState(false)

    let state = useSelector(state => state.characters)
    const characters = state.characters
    const deletedCharacter = state.deletedCharacter
    // const characters = useSelector(state => state.user.user.user_characters)
    const dispatch = useDispatch()
    
    const handleReturn = () => {
        setShow(false)
        dispatch(setDeletedCharacter({}))
    }
    
    const handleDeleteCharacter = () => {
        dispatch(confirmDeleteCharacter(deletedCharacter.id, state.characters, handleReturn))
    }

    return (
        <div className="selection-container">
            { characters.map((character, idx) => <CharacterCard key={idx} setShow={setShow} setShowCreation={setShowCreation} character={character}/>) }
            <div className="confirm-overlay" style={{display: show ? "block" : "none"}}>
                <motion.div className="confirm-box" variants={confirmVar} animate={show ? "show" : "hidden"}>
                    <h1>Retire {deletedCharacter.name}?</h1>
                    <div className="confirm-buttons">
                        <div className="return">
                            <motion.button
                                animate={noHover ? "effect" : "none"}
                                variants={noButtonVar}
                                onMouseEnter={() => setNoHover(true)}
                                onMouseLeave={() => setNoHover(false)}
                                onClick={handleReturn}
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
                                onClick={handleDeleteCharacter}
                            >
                                <motion.p animate={yesHover ? "effect" : "none"} variants={yesTextVar}>DELETE</motion.p>
                                <motion.div className="svg" variants={yesSvgVar} animate={yesHover ? "effect" : "none"}>
                                    <FiX size={yesHover ? 25 : 17}/>
                                </motion.div>
                            </motion.button>
                        </div>
                    </div>
                    <p>All character data will be lost!</p>
                </motion.div>
            </div>
            <CreateCharacter showCreation={showCreation}/>
        </div>
    )
}

export default Selection

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