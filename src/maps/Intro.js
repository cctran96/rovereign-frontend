import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { createItem } from "../actions/itemActions"
import { updateCharacter } from "../actions/characterActions"
import { motion } from "framer-motion"
import { ImArrowDownRight } from "react-icons/im/index.esm"
import UserInterface from "../components/UserInterface"

const Intro = ({player}) => {
    // Grab seller image from store
    let sellers = useSelector(state => state.images.imageSrc.sellers)
    let characters = useSelector(state => state.characters.characters)

    // Set dispatch to variable
    const dispatch = useDispatch()

    // Dialoague for current screen
    const name = player.name
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
        {Kyle: 'Access your inventory by clicking on the inventory icon or by using the "I" key.'},
        {Kyle: 'View your skills by clicking on the skills icon or by pressing the "K" key'},
        {Kyle: `If you'd like to switch characters, you can log off by clicking the log off icon or by hitting "ESC"`},
        {Kyle: "Just outside of this town is Primeval Forest where Satyrs roam. Put your skills to the test to see if you can defeat one."},
        {Kyle: "Here's 1000 gold. Good luck!"},
        {Message: "You receive 1000 gold."}
    ])

    // Shows arrow when pointing to icon
    const [arrow, setArrow] = useState(null)

    useEffect(() => {
        const obj = {
            health_potion: 3,
            mana_potion: 3,
            strength_potion: 3,
            range_potion: 3,
            magic_potion: 3
        }
        switch (dialogue.length) {
            // case 0:
            //     dispatch(updateCharacter(player, {gold: 1000}, characters))
            // case 6:
            //     dispatch(createItem(player, obj, characters))
            case 5:
                setArrow("inv")
                break
            case 4:
                setArrow("skill")
                break
            case 3:
                setArrow("log")
                break
            default:
                setArrow(null)
        }
    }, [dialogue])

    return (
        <div className="introduction">
            <div className="seller" style={{backgroundImage: `url(${sellers[0]})`}}/>
            <UserInterface dialogue={dialogue} setDialogue={setDialogue}/>
            <motion.div 
                className="arrow" 
                variants={arrowVar} 
                animate={arrow === "inv" ? "inv" : (arrow === "skill" ? "skill" : (arrow === "log" ? "log" : "none"))}
            >
                <ImArrowDownRight size={40} color="white"/>
            </motion.div>
        </div>
    )
}

export default Intro

const arrowVar = {
    none: {opacity: 0},
    inv: {opacity: 1, transition: {duration: 0.5}},
    skill: {opacity: 1, y: 50, transition: {duration: 0.5}},
    log: {opacity: 1, y: 150, transition: {duration: 0.5}}
}