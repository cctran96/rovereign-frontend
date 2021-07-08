import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useKeyDown, useKeyUp } from "../helpers/useKeyPress"
import { updateChatBox } from "../actions/menuAction"
import { startBattle } from "../actions/battleActions"
import { motion } from "framer-motion"
import UserInterface from "../interface/UserInterface"
import BattleInterface from "../interface/BattleInterface"
import MonsterSprite from "../components/MonsterSprite"

const BattleIntro = ({player}) => {
    // Set dispatch to variable
    const dispatch = useDispatch()
    
    // Grab chat from store
    const chat = useSelector(state => state.menu.chat)

    // State for character's current action
    const [action, setAction] = useState("idle")

    // State for map positions, monster poisition
    const [map1Pos, setMap1Pos] = useState(0)
    const [map2Pos, setMap2Pos] = useState(880)

    // State for monster position
    const [monPos, setMonPos] = useState(1000)

    // Updates chat on render
    useEffect(() => {
        dispatch(updateChatBox([{Notice: "You've entered Primeval Forest."}]))
    }, [])

    // Grab first map and monster from store
    let map = useSelector(state => state.images.maps.find(i => i.includes("primeval_forest")))
    let monster = useSelector(state => state.monsters.monsters.find(m => m.name === "vang_satyr"))

    // Checks if in battle
    const inBattle = useSelector(state => state.battle.inBattle)

    // Images for character
    let images = useSelector(state => state.images.imageSrc[player.role])
    const findImage = stance => images.find(img => img.includes(stance))
    const imageHash = {
        attack: findImage("attack"),
        die: findImage("die"),
        hurt: findImage("hurt"),
        idle: findImage("idle"),
        jump: findImage("jump"),
        run: findImage("run"),
        walk: findImage("walk")
    }

    const stepSize = 24

    const switchAction = e => {
        const map1 = map1Pos - stepSize
        const map2 = map2Pos - stepSize
        const mon = monPos - stepSize
        switch(e.key) {
            case "d":
            case "ArrowRight":
                setMap1Pos(map1 <= -888 ? 880 : map1)
                setMap2Pos(map2 <= -888 ? 880 : map2)
                setMonPos(mon)
                mon < 650 ? handleAmbush() : console.log()
                setAction(mon < 650 ? "idle" : "run")
                break
            default:
                return
        }
    }

    const handleAmbush = () => {
        const stats = monster.base_stats
        let obj = {
            name: "Vang Satyr",
            level: 1,
            current_hp: stats.hp,
            hp: stats.hp,
            current_mp: stats.mp,
            mp: stats.mp,
            str: stats.str,
            dex: stats.dex,
            int: stats.int,
            spd: stats.spd,
            def: stats.def,
            cri: stats.cri,
            drops: monster.drops,
            gold: monster.gold,
            exp: 83
        }
        
        dispatch(startBattle(obj, player))
        dispatch(updateChatBox([...chat, {Notice: "You've been ambushed by a Vang Satyr!"}]))
    }

    useKeyUp(() => !inBattle ? setAction("idle") : null)
    useKeyDown(e => !inBattle ? switchAction(e) : null)

    return (
        <div className="battle-intro" style={{backgroundColor: "lightgreen"}}>
            <div className="map-container">
                <div className="map-back1" style={{backgroundImage: `url(${map})`, transform: `translate3d(${map1Pos}px, 0, 0)`}}/>
                <div className="map-back2" style={{backgroundImage: `url(${map})`, transform: `translate3d(${map2Pos}px, 0, 0)`}}/>
                <MonsterSprite monster={monster} position={monPos} stance="idle"/>
            </div>
            <div className="player-container">
                <div className="image-container" style={{backgroundImage: `url(${imageHash[action]})`}}/>
            </div>
            <UserInterface/>
            {inBattle ? <BattleInterface/> : null}
        </div>
    )
}

export default BattleIntro