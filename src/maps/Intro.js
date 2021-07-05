import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import UserInterface from "../components/UserInterface"
import { createItem } from "../actions/itemActions"
import { updateCharacter } from "../actions/characterActions"

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
        {Message: "You receive 5 health potions, 5 mana potions, 5 strength potions, 5 range potions, and 5 magic potions."},
        {Kyle: "Just outside of this town is Primeval Forest where Satyrs roam. Put your skills to the test to see if you can defeat one."},
        {Kyle: "Here's 1000 gold. Good luck!"},
        {Message: "You receive 1000 gold."}
    ])

    useEffect(() => {
        if (dialogue.length === 3) {
            const obj = {
                health_potion: 3,
                mana_potion: 3,
                strength_potion: 3,
                range_potion: 3,
                magic_potion: 3
            }
            dispatch(createItem(player, obj, characters))
        } else if (!dialogue.length) {
            dispatch(updateCharacter(player, {gold: 1000}, characters))
        }
    }, [dialogue])

    return (
        <div className="introduction">
            <div className="seller" style={{backgroundImage: `url(${sellers[0]})`}}/>
            <UserInterface dialogue={dialogue} setDialogue={setDialogue}/>
        </div>
    )
}

export default Intro

