import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { selectMove, endBattle, changeDisplay, setCurrentMonster, setUseItem } from "../actions/battleActions"
import { changePlayerStance, changeMonsterStance } from "../actions/stanceActions"
import { setCurrentCharacter } from "../actions/characterActions"
import { updateChatBox } from "../actions/menuAction"
import { AiFillCaretRight } from "react-icons/ai/index.esm"
import { updateMapMonsters, updateUsedItems } from "../actions/mapActions"

const BattleInterface = () => {
    // Set disaptch to variable
    const dispatch = useDispatch()

    // Grab chat dialogue from store
    const chat = useSelector(state => state.menu.chat)

    // Each time the dialogue changes, the chat in store is updated
    const [dialogue, setDialogue] = useState(null)
    useEffect(() => {
        dialogue ? dispatch(updateChatBox([...chat, dialogue])) : console.log()
    }, [dialogue])

    const mapMonsters = useSelector(state => state.map.monsters)
    const usedItems = useSelector(state => state.map.items)

    // Grab battle states from store and destructure
    const state = useSelector(state => state.battle)
    const { inBattle, monster, selection, display, item }  = state
    const player = useSelector(state => state.characters.currentCharacter)
    const {stats, inventory} = player

    // Destructure items and skills info from details state
    const details = useSelector(state => state.details)
    const { items, skills } = details
    const itemImages = useSelector(state => state.images.items.items)

    // Grab frame information from store
    const imageInfo = useSelector(state => state.images.typeInfo)
    const monFrames = imageInfo[monster.name.split("_")[1]]
    const playerFrames = imageInfo[player.role]

    // Format names of monsters/skills/potions to look pretty
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
    const formattedMonName = formatName(monster.name)

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

    // Monster attack
    const monsterAttack = (playerObj, callback) => {
        const damage = calculateMonsterDamage()
        const playDiff = playerObj ? playerObj.stats.current_hp - damage : stats.current_hp - damage
        let newPlayerObj = playerObj ? playerObj : player
        newPlayerObj = {...newPlayerObj, stats: {...newPlayerObj.stats, current_hp: playDiff > 0 ? playDiff : 0}}
        dispatch(changeDisplay(true))
        dispatch(changeMonsterStance("attack"))
        setTimeout(() => {
            dispatch(changeMonsterStance("idle"))
            dispatch(changePlayerStance(playDiff > 0 ? "hurt" : "die"))
            dispatch(setCurrentCharacter(newPlayerObj))
            if (playDiff > 0) {
                setDialogue({Notice: `The ${formattedMonName} deals ${damage} damage to you.`})
                setTimeout(() => {
                    dispatch(changePlayerStance("idle"))
                    typeof callback === "function" && setTimeout(() => callback(newPlayerObj), 300)
                    dispatch(changeDisplay(false))
                }, playerFrames.hurt * 100)
            } else {
                setDialogue({Notice: `The ${formattedMonName} deals you the final blow, knocking you unconscious.`})
                setTimeout(() => dispatch(endBattle()), 3000)
            }
        }, monFrames.attack * 100)
    }

    // Default attack
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
                setDialogue({[player.name]: `You deal the finishing blow. The ${formattedMonName} was no match for you.`})
                setTimeout(() => {
                    dispatch(endBattle())
                    dispatch(updateMapMonsters(mapMonsters.map(m => m.level === monster.level ? {...m, current_hp: 0} : m)))
                }, 3000)
            }
        }, playerFrames.attack * 100)
    }

    // Skill attack
    const playerSkillAttack = (skill, playerObj, callback) => {
        const mp = skill.effect.mp
        const damage = calculatePlayerDamage(skill.effect.attack.damage)
        const monDiff = monster.current_hp - damage
        let newPlayerObj = playerObj ? playerObj : player
        newPlayerObj = {...newPlayerObj, stats: {...newPlayerObj.stats, current_mp: newPlayerObj.stats.current_mp - mp}}
        dispatch(changeDisplay(true))
        dispatch(changePlayerStance("attack"))
        dispatch(setCurrentCharacter(newPlayerObj))
        setTimeout(() => {
            dispatch(changePlayerStance("idle"))
            dispatch(changeMonsterStance(monDiff > 0 ? "hurt" : "die"))
            dispatch(setCurrentMonster({...monster, current_hp: monDiff > 0 ? monDiff : 0}))
            if (monDiff > 0) {
                setDialogue({[player.name]: `You used ${formatName(skill.name)} on the ${formattedMonName}, dealing ${damage} damage.`})
                setTimeout(() => {
                    dispatch(changeMonsterStance("idle"))
                    typeof callback === "function" && setTimeout(() => callback(newPlayerObj), 300)
                    dispatch(changeDisplay(false))
                }, monFrames.hurt * 100)
            } else {
                setDialogue({[player.name]: `You used ${formatName(skill.name)} on the ${formattedMonName}, putting an end to it. It had a family...`})
                setTimeout(() => {
                    dispatch(endBattle())
                    dispatch(updateMapMonsters(mapMonsters.map(m => m.level === monster.level ? {...m, current_hp: 0} : m)))
                }, 3000)
            }
            
        }, playerFrames.attack * 100)
    }

    // Skill buff
    const playerSkillBuff = (skill, playerObj, callback) => {
        const mp = skill.effect.mp
        const buff = skill.effect.buff
        const buffedStat = Object.keys(buff)[0]
        let newPlayerObj = playerObj ? playerObj : player
        newPlayerObj = {
            ...newPlayerObj, 
            stats: {...newPlayerObj.stats, 
                current_mp: newPlayerObj.stats.current_mp - mp,
                [buffedStat]: Math.floor(newPlayerObj.stats[buffedStat] * (1 + buff[buffedStat]/100))
            }
        }
        dispatch(changeDisplay(true))
        setTimeout(() => {
            dispatch(setCurrentCharacter(newPlayerObj))
            setDialogue({[player.name]: `You used ${formatName(skill.name)}, increasing your ${buffedStat.toUpperCase()} by ${buff[buffedStat]}%.`})
            setTimeout(() => {
                dispatch(setUseItem(null))
                typeof callback === "function" && setTimeout(() => callback(newPlayerObj), 300)
                dispatch(changeDisplay(false))
            }, 700)
        }, 1000)
    }

    // Using item
    const playerUseItem = (item, callback) => {
        dispatch(changeDisplay(true))
        dispatch(setUseItem(item))
        setTimeout(() => {
            const obj = item.effect.increase
            const key = Object.keys(obj)[0]
            const current = `current_${key}`
            const total = stats[current] + obj[key]
            const newTotal = total > stats[key] ? stats[key] : total
            const inventoryItem = inventory.find(i => i.item === item.name)
            const updatedItem = {...inventoryItem, amount: inventoryItem.amount - 1}
            const newInv = inventory.map(i => i.item === item.name ? updatedItem : i)
            let items = {...usedItems}
            items[item.name] = (items[item.name] || 0) + 1
            dispatch(updateUsedItems(items))
            let newPlayerObj
            if (key === "hp" || key === "mp") {
                newPlayerObj = {...player, stats: {...stats, [current]: newTotal}, inventory: newInv}
                dispatch(setCurrentCharacter(newPlayerObj))
                setDialogue({[player.name]: `You take a sip of your ${formatName(item.name)}. You feel reinvigorated.`})
            } else {
                const value = Object.values(obj)[0]
                newPlayerObj = {...player, stats: {...stats, [key]: stats[key] + value}, inventory: newInv}
                dispatch(setCurrentCharacter(newPlayerObj))
                setDialogue({[player.name]: `You take a sip of your ${formatName(item.name)}, increasing your ${key.toUpperCase()} by ${value}.`})
            }
            setTimeout(() => {
                dispatch(setUseItem(null))
                typeof callback === "function" && setTimeout(() => callback(newPlayerObj), 300)
                dispatch(changeDisplay(false))
            }, 700)
        }, 2000)
    }

    // Action for when using default attack
    const confirmDefault = () => {
        storeSelectedMove(null)
        if (stats.spd > monster.spd) {
            playerAttack(monsterAttack)
        } else {
            monsterAttack(null, playerAttack)
        }
    }

    // Action for when using a skill
    const confirmSkill = () => {
        const name = Object.values(selection)[0]
        const skill = skills.find(s => s.name === name)
        storeSelectedMove(null)
        if (skill.effect.attack) {
            if (stats.spd > monster.spd) {
                playerSkillAttack(skill, null, monsterAttack)
            } else {
                monsterAttack(null, (playerObj) => playerSkillAttack(skill, playerObj))
            }
        } else if (skill.effect.buff) {
            if (stats.spd > monster.spd) {
                playerSkillBuff(skill, null, monsterAttack)
            } else {
                monsterAttack(null, (playerObj) => playerSkillBuff(skill, playerObj))
            }
        }
    }

    // Action for when using an item
    const confirmItem = () => {
        const name = Object.values(selection)[0]
        const item = items.find(i => i.name === name)
        storeSelectedMove(null)
        if (item.effect.increase) {
            playerUseItem(item, monsterAttack)
        }
    }

    // Checks for which action is selected and confirms the move
    const confirmMove = () => {
        selection.error ? console.log() : dispatch({ type: "ALL_MENUS" })
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
            <motion.h1 style={{fontFamily: "URW Chancery L, cursive"}} animate={ambushVar}>AMBUSH!</motion.h1>
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
            {   item ? 
                <motion.div 
                className="battle-item"
                animate={itemVar}
                style={{
                    backgroundImage: `url(${itemImages.find(i => i.split(/[/|.]/)[3] === item.name)})`,
                }}/> 
                : null
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

const itemVar = {
    y: [-1000, 25, -25, 25, 0, 0],
    x: [420, 420, 420, 420, 420, 0],
    transition: {duration: 2, times: []}
}