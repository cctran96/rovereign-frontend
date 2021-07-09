import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { selectMove, endBattle, changeDisplay, setCurrentMonster } from "../actions/battleActions"
import { changePlayerStance, changeMonsterStance } from "../actions/stanceActions"
import { setCurrentCharacter } from "../actions/characterActions"
import { updateChatBox } from "../actions/menuAction"
import { AiFillCaretRight } from "react-icons/ai/index.esm"

const BattleInterface = () => {
    // Set disaptch to variable
    const dispatch = useDispatch()

    // Grab chat dialogue from store
    const chat = useSelector(state => state.menu.chat)

    // Each time dialogue, changes, the chat in store is updated
    const [dialogue, setDialogue] = useState(null)
    useEffect(() => {
        dialogue ? dispatch(updateChatBox([...chat, dialogue])) : console.log()
    }, [dialogue])

    // Grab battle states from store and destructure
    const state = useSelector(state => state.battle)
    const { inBattle, monster, selection, display }  = state
    const player = useSelector(state => state.characters.currentCharacter)
    const stats = player.stats

    // Destructure items and skills info from details state
    const details = useSelector(state => state.details)
    const { items, skills } = details

    // Grab frame information from store
    const imageInfo = useSelector(state => state.images.typeInfo)
    const monFrames = imageInfo[monster.name.split("_")[1]]
    const formattedMonName = monster.name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
    const playerFrames = imageInfo[player.role]

    // Color of monster bars
    const hpColor = () => {
        const health = monster.current_hp/monster.hp
        if (health <= 0.3) {
            return "red"
        } else if (health <= 0.7) {
            return "#b1b108"
        }
        return "green"
    }
    
    const mpColor = () => {
        const mana = monster.current_mp/monster.mp
        if (mana <= 0.3) {
            return "#4e4ec2"
        } else if (mana <= 0.7) {
            return "#1717be"
        }
        return "#01017e"
    }

    // Store selected move before confirm
    const storeSelectedMove = obj => {
        dispatch(selectMove(obj))
    }

    const isCrit = percent => {
        let items = Array(100).fill(false)
        for (let i = 0; i < percent; i++) {
            items[i] = true
        }
        return items[Math.floor(Math.random()*items.length)]
    }

    // Calculates damage player does on monster
    const calculatePlayerDamage = (skill = 0) => {
        let crit = isCrit(stats.cri) ? 2 : 1
        let mult = (Math.random() * (120 - 100 + 1) + 100)/100
        if (["spearman", "crusader", "hero"].includes(player.role)) {
            return Math.floor((((2 * player.level + 10)/2) + ((stats.str/(monster.def/2)) + 2) + skill) * mult * crit)
        } else if (["hunter", "crossbowman", "robinhood"].includes(player.role)) {
            return Math.floor((((2 * player.level + 10)/2) + ((stats.dex/(monster.def/2)) + 2) + skill) * mult * crit)
        } else if (["magician", "sorcerer", "elysianist"].includes(player.role)) {
            return Math.floor((((2 * player.level + 10)/2) + ((stats.int/(monster.def/2)) + 2) + skill) * mult * crit)
        }
    }
    // Calculates damage monster does on player
    const calculateMonsterDamage = () => {
        let crit = isCrit(monster.cri) ? 2 : 1
        let name = monster.name.split(" ")[1]
        let mult = (Math.random() * (120 - 100 + 1) + 100)/100
        if (name === "Wraith") {
            return Math.floor((((2 * monster.level + 10)/2) + ((monster.int/(stats.def/2)) + 2)) * mult * crit)
        } else {
            return Math.floor((((2 * monster.level + 10)/2) + ((monster.str/(stats.def/2)) + 2)) * mult * crit)
        }
    }

    const monsterAttack = callback => {
        const damage = calculateMonsterDamage()
        const playDiff = stats.current_hp - damage
        dispatch(changeDisplay(true))
        dispatch(changeMonsterStance("attack"))
        setTimeout(() => {
            dispatch(changeMonsterStance("idle"))
            dispatch(changePlayerStance(playDiff > 0 ? "hurt" : "die"))
            dispatch(setCurrentCharacter({...player, stats: {...stats, current_hp: playDiff > 0 ? playDiff : 0}}))
            if (playDiff > 0) {
                setDialogue({Notice: `The ${formattedMonName} deals ${damage} damage to you.`})
                setTimeout(() => {
                    dispatch(changePlayerStance("idle"))
                    typeof callback === "function" && setTimeout(() => callback(), 300)
                    dispatch(changeDisplay(false))
                }, playerFrames.hurt * 100)
            } else {
                setTimeout(() => dispatch(endBattle()), 3000)
                setDialogue({Notice: `The ${formattedMonName} deals you the final blow, knocking you unconscious.`})
            }
        }, monFrames.attack * 100)
    }

    const playerAttack = callback => {
        const damage = calculatePlayerDamage()
        const monDiff = monster.current_hp - damage
        dispatch(changeDisplay(true))
        dispatch(changePlayerStance("attack"))
        setTimeout(() => {
            dispatch(changePlayerStance("idle"))
            dispatch(changeMonsterStance(monDiff > 0 ? "hurt" : "die"))
            dispatch(setCurrentMonster({...monster, current_hp: monDiff > 0 ? monDiff : 0}))
            if (monDiff > 0) {
                setDialogue({[player.name]: `You deal ${damage} damage to the ${formattedMonName}.`})
                setTimeout(() => {
                    dispatch(changeMonsterStance("idle"))
                    typeof callback === "function" && setTimeout(() => callback(), 300)
                    dispatch(changeDisplay(false))
                }, monFrames.hurt * 100)
            } else {
                setTimeout(() => dispatch(endBattle()), 3000)
                setDialogue({[player.name]: `You deal the finishing blow. The ${formattedMonName} was no match for you.`})
            }
            
        }, playerFrames.attack * 100)
    }

    // Action for when using default attack
    const confirmDefault = () => {
        storeSelectedMove(null)
        if (stats.spd > monster.spd) {
            playerAttack(monsterAttack)
        } else {
            monsterAttack(playerAttack)
        }
    }

    // Action for when using a skill
    const confirmSkill = () => {
        console.log("skill")
    }

    // Action for when using an item
    const confirmItem = () => {
        const name = Object.values(selection)[0]
        const effect = items.find(i => i.name === name).effect
        console.log(effect)
    }

    // Checks for which action is selected and confirms the move
    const confirmMove = () => {
        switch(Object.keys(selection)[0]) {
            case "default":
                confirmDefault()
                break
            case "skill":
                confirmSkill()
                break
            case "item":
                confirmItem()
                break
            default:
                return
        }
    }

    return (
        inBattle ? 
        <div className="battle-ui">
            <motion.h1 animate={ambushVar}>AMBUSH!</motion.h1>
            <motion.div className="monster-info" animate={monsterVar}>
                <div className="monster-name">
                    <p>{formattedMonName}</p>
                    <p>Level: {monster.level}</p>
                </div>
                <div className="ui-bar">
                    <b style={{color: "white"}}>HP: </b>
                    <div className="bar-border">
                        <div className="hp">
                            <p>{monster.current_hp}/{monster.hp}</p>
                        </div>
                        <div className="ui-hp" style={{backgroundColor: hpColor(), width: `${(monster.current_hp/monster.hp)*100}%`}}/>
                    </div>
                </div>
                <div className="ui-bar">
                    <b style={{color: "white"}}>MP: </b>
                    <div className="bar-border">
                        <div className="mp">
                            <p>{monster.current_mp}/{monster.mp}</p>
                        </div>
                        <div className="ui-mp" style={{backgroundColor: mpColor(), width: `${(monster.current_mp/monster.mp)*100}%`}}/>
                    </div>
                </div>
            </motion.div>
            {   display ? null :
                <>
                    {selection ? 
                    <div className="selected-move">
                        <p>{Object.keys(selection)[0].toUpperCase()}: {Object.values(selection)[0].split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}</p>
                        <button onClick={confirmMove}><AiFillCaretRight size={20}/></button>
                    </div> : null}
                    <motion.button 
                        className="default-attack" 
                        onClick={() => storeSelectedMove({default: "Attack"})}
                        variants={defaultVar}
                        initial="start"
                        animate="end"
                    >
                        DEFAULT ATTACK
                    </motion.button>
                </>
            }
        </div> : null
    )
}

export default BattleInterface

const ambushVar = {
    y: [-200, 175, 175, 175],
    x: [0, 0, 0, 2000],
    transition: {duration: 3, times: [0, 0.2, 0.5, 0.7]}
}

const monsterVar = {
    x: [2000, 0],
    transition: {delay: 1.5}
}

const defaultVar = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {delay: 1, duration: 0.5}}
}