import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { debounce } from "../helpers/debounce"
import { GiLightBackpack, GiSkills } from "react-icons/gi/index.esm"
import { RiLogoutBoxLine, RiSettings4Fill } from "react-icons/ri/index.esm"
import { toggleInventoryMenu, toggleSkillsMenu, toggleSettingsMenu, toggleLogMenu } from "../actions/menuAction"

const UserInterface = ({dialogue, setDialogue}) => {
    // Grab player from store and destructure
    let player = useSelector(state => state.characters.currentCharacter)
    const {name, gold, level, experience, stats, role} = player

    // Set dispatch to variable
    const dispatch = useDispatch()

    // Chat state, end tutorial state
    const [chat, setChat] = useState([])

    // Grabs experience threshold from store and calculates current exp
    let experinceThreshold = useSelector(state => state.exp.exp)
    const currentExp = experience - experinceThreshold[level]
    const expToLevel = experinceThreshold[level + 1] - experinceThreshold[level]

    // Grabs gold sprite
    let goldSprite = useSelector(state => state.images.items.gold[0])

    // Adds next dialogue to chatbox
    const keyPress = debounce(e => {
        const chatbox = document.querySelector(".chatbox")
        if (e.key === " " && dialogue && dialogue.length) {
            setChat([...chat, dialogue[0]])
            setDialogue(dialogue.slice(1))
            chatbox.scrollTop = chatbox.scrollHeight
        } else if (e.key === "Escape") {
            dispatch(toggleLogMenu())
        } else if (e.key === "k") {
            dispatch(toggleSkillsMenu())
        } else if (e.key === "i") {
            dispatch(toggleInventoryMenu())
        } else if (e.key === "x") {
            dispatch(toggleSettingsMenu())
        }
    }, 100)

    useEffect(() => {
        window.addEventListener("keydown", keyPress)
        return () => window.removeEventListener("keydown", keyPress)
    }, [keyPress])

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

    return (
        <div className="ui">
            <div className="player-info-ui">
                <div className="player-info-container">
                    <div className="ui-bar-container">
                        <div className="ui-bar">
                            <b>HP: </b>
                            <div className="bar-border">
                                <div className="hp">
                                    <p>{stats.current_hp}/{stats.hp}</p>
                                </div>
                                <div className="ui-hp" style={{backgroundColor: hpColor(), width: `${(stats.current_hp/stats.hp)*100}%`}}/>
                            </div>
                        </div>
                        <div className="ui-bar">
                            <b>MP: </b>
                            <div className="bar-border">
                                <div className="mp">
                                    <p>{stats.current_hp}/{stats.hp}</p>
                                </div>
                                <div className="ui-mp" style={{backgroundColor: mpColor(), width: `${(stats.current_mp/stats.mp)*100}%`}}/>
                            </div>
                        </div>
                        <div className="ui-bar">
                            <b>EXP: </b>
                            <div className="bar-border">
                                <div className="exp">
                                    <p>{currentExp}/{expToLevel}</p>
                                </div>
                                <div className="ui-exp" style={{backgroundColor: "yellow", width: `${(currentExp/expToLevel)*100}%`}}/>
                            </div>
                        </div>
                    </div>
                    <div className="player-info">
                        <div className="ui-player-name">
                            <p style={{fontSize: "22px"}}><b>{name}</b></p>
                            <p>{role[0].toUpperCase() + role.slice(1)}</p>
                        </div>
                        <div className="ui-level">
                            <p>Level: {level}</p>
                        </div>
                        <div className="ui-gold">
                            <motion.p initial="start" animate="end" variants={chatVar}>{gold}</motion.p>
                            <div className="gold-sprite" style={{backgroundImage: `url(${goldSprite})`}}/>
                        </div>
                    </div>
                </div>
                <div className="ui-icon-container">
                    <div className="ui-icon" onClick={() => dispatch(toggleInventoryMenu())}>
                        <GiLightBackpack size={35} color="#3b230b"/>
                    </div>
                    <div className="ui-icon" onClick={() => dispatch(toggleSkillsMenu())}>
                        <GiSkills size={35} color="#0a0a53"/>
                    </div>
                    <div className="ui-icon" onClick={() => dispatch(toggleSettingsMenu())}>
                        <RiSettings4Fill size={35} color="#3f3e3e"/>
                    </div>
                    <div className="ui-icon" onClick={() => dispatch(toggleLogMenu())}>
                        <RiLogoutBoxLine size={35}/>
                    </div>
                </div>
            </div>
            <div className="chatbox">
                {   chat.length ?
                    chat.map((obj, idx) => {
                            const key = Object.keys(obj)
                            return (
                                <motion.p 
                                    key={idx} 
                                    initial="start" 
                                    animate="end" 
                                    variants={chatVar} 
                                    style={{color: key[0] === "Message" ? "lightgreen" : (key[0] === name ? "cyan" : "whitesmoke")}}
                                >
                                    <b>{key}:</b> {obj[key]}
                                </motion.p>
                            )
                        }) : null
                }
            </div>
        </div>
    )
}

export default UserInterface

const chatVar = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 0.7, ease: "easeInOut"}}
}