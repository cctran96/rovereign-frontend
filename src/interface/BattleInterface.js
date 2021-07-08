import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { selectMove } from "../actions/battleActions"
import { AiFillCaretRight } from "react-icons/ai/index.esm"

const BattleInterface = () => {
    // Set disaptch to variable and destructure battle states from store
    const dispatch = useDispatch()
    const state = useSelector(state => state.battle)
    const { inBattle, monster, player, selection }  = state


    // Color of monster bars
    const hpColor = () => {
        const health = monster.current_hp/monster.hp
        if (health <= 0.3) {
            return "red"
        } else if (health <= 0.7) {
            return "yellow"
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

    const storeSelectedMove = obj => {
        dispatch(selectMove(obj))
    }

    return (
        inBattle ? 
        <div className="battle-ui">
            <motion.h1 animate={ambushVar}>AMBUSH!</motion.h1>
            <motion.div className="monster-info" animate={monsterVar}>
                <div className="monster-name">
                    <p>{monster.name}</p>
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
            {   selection ? 
                <div className="selected-move">
                    <p>{Object.keys(selection)[0].toUpperCase()}: {Object.values(selection)[0]}</p>
                    <button><AiFillCaretRight size={20}/></button>
                </div> : null
            }
            {
                <motion.button animate={defaultVar} className="default-attack" onClick={() => storeSelectedMove({default: "Attack"})}>
                    DEFAULT ATTACK
                </motion.button>
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
    x: [-2000, 0],
    transition: {delay: 1.8}
}