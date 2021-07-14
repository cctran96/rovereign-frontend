import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateCharAndInventory } from "../actions/playerActions"
import { updateChatBox } from "../actions/menuAction"
import { debounce } from "../helpers/debounce"
import { motion } from "framer-motion"
import { ImArrowDownRight, ImArrowLeft } from "react-icons/im/index.esm"

const Intro = ({player}) => {
    // Grab seller image and characters from store
    let sellers = useSelector(state => state.images.imageSrc.sellers)
    let characters = useSelector(state => state.characters.characters)
    let currentCharacter = useSelector(state => state.characters.currentCharacter)

    // Set dispatch to variable
    const dispatch = useDispatch()

    // Dialoague for current screen
    const name = player.name
    const chat = useSelector(state => state.menu.chat)
    const [dialogue, setDialogue] = useState([
        {Merchant: "Hey, newbie. You're not from around here are you?"}, 
        {[name]: "Is it that obvious? I'm just beginning my journey."},
        {Merchant: "Don't worry. I'll help you out."},
        {Merchant: "The name's Kyle, and this is my shop, Amazen, where everything is amazen!"},
        {Kyle: "Get it? Because it sounds like amazing!"},
        {[name]: "You know it's not very funny if you have to explain it."},
        {Kyle: "If you laugh right now, I'll give you some free potions."},
        {[name]: "HAHAHA. That's the best joke I've ever heard!"},
        {Message: "You receive 3 health potions, 3 mana potions, 3 strength potions, 3 range potions, and 3 magic potions."},
        {Kyle: `If you'd like to switch characters, you can log off by clicking the log off icon or by hitting "ESC" key.`},
        {Kyle: `You can check on your stats by clicking this stats icon or by pressing the "S" key.`},
        {Kyle: 'View your skills by clicking on the skills icon or by pressing the "K" key.'},
        {Kyle: 'Access your inventory by clicking on the inventory icon or by using the "I" key.'},
        {Kyle: "Just outside of this town is Primeval Forest where Satyrs roam. Put your skills to the test to see if you can defeat one."},
        {Kyle: "Here's 1000 gold. Good luck!"},
        {Message: "You receive 1000 gold."}
    ])

    // Shows arrow when pointing to icon
    const [arrow, setArrow] = useState(null)

    // Adds next dialogue to chatbox
    const keyPress = debounce(e => {
        if (e.key === " " && dialogue && dialogue.length) {
            dispatch(updateChatBox([...chat, dialogue[0]]))
            setDialogue(dialogue.slice(1))
        }
        return
    }, 100)

    useEffect(() => {
        window.addEventListener("keydown", keyPress)
        return () => window.removeEventListener("keydown", keyPress)
    }, [keyPress])

    useEffect(() => {
        switch (dialogue.length) {
            case 0:
                dispatch({ type: "SELECT_CHARACTER", character: {...currentCharacter, gold: 1000}})
                break
            case 7:
                dispatch({ type: "SELECT_CHARACTER", character: {...currentCharacter, inventory: fakeInv}})
                break
            case 3:
                setArrow("inv")
                break
            case 4:
                setArrow("skill")
                break
            case 5:
                setArrow("stat")
                break
            case 6:
                setArrow("log")
                break
            default:
                setArrow(null)
        }
    }, [dialogue, dispatch])

    const confirmEndTutorial = () => {
        const obj = {
            health_potion: 3,
            mana_potion: 3,
            strength_potion: 3,
            range_potion: 3,
            magic_potion: 3
        }
        dispatch(updateCharAndInventory(player, {gold: 1000}, obj, characters))
        dispatch(updateChatBox([]))
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
            {   !dialogue.length ? 
                <div className="end-tutorial" onClick={confirmEndTutorial}>
                    <p style={{margin: 0}}>Primeval Forest</p>
                    <ImArrowLeft size={40}/>
                </div> : null
            }
            <motion.div 
                className="arrow" 
                variants={arrowVar} 
                animate={arrow === "stat" ? "stat" : (arrow === "inv" ? "inv" : (arrow === "skill" ? "skill" : (arrow === "log" ? "log" : "none")))}
            >
                <ImArrowDownRight size={40} color="white"/>
            </motion.div>
        </motion.div>
    )
}

export default Intro

const arrowVar = {
    none: {opacity: 0},
    inv: {opacity: 1, transition: {duration: 0.5, type: "spring", bounce: 0}},
    skill: {opacity: 1, y: 50, transition: {duration: 0.5, type: "spring", bounce: 0}},
    stat: {opacity: 1, y: 100, transition: {duration: 0.5, type: "spring", bounce: 0}},
    log: {opacity: 1, y: 150, transition: {duration: 0.5, type: "spring", bounce: 0}}
}

const fakeInv = [
    {amount: 3, item: "magic_potion"},
    {amount: 3, item: "range_potion"},
    {amount: 3, item: "strength_potion"},
    {amount: 3, item: "mana_potion"},
    {amount: 3, item: "health_potion"}
]

const fadeIn = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 1, ease: "easeInOut"}}
}