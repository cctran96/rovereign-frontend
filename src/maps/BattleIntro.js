import React, { useState, useEffect } from "react"
import BattleInterface from "../interface/BattleInterface"
import MonsterSprite from "../components/MonsterSprite"
import { useSelector, useDispatch } from "react-redux"
import { useKeyDown, useKeyUp } from "../helpers/useKeyPress"
import { updateChatBox } from "../actions/menuAction"
import { startBattle } from "../actions/battleActions"
import { changePlayerStance } from "../actions/stanceActions"
import { updateCharacter } from "../actions/playerActions"
import { goBackToTown } from "../actions/mapActions"
import { motion } from "framer-motion"
import { FaArrowAltCircleLeft } from "react-icons/fa/index.esm"
import { updateMapMonsters } from "../actions/mapActions"

const BattleIntro = ({player}) => {
    const [hover, setHover] = useState(false)

    // Set dispatch to variable
    const dispatch = useDispatch()
    
    // Grab chat from store
    const chat = useSelector(state => state.menu.chat)

    // State for character's current action
    const action = useSelector(state => state.stance.player)

    // State for map positions, monster poisition
    const [map1Pos, setMap1Pos] = useState(0)
    const [map2Pos, setMap2Pos] = useState(880)

    // State for monster position
    const [monPos, setMonPos] = useState(1000)

    // Updates chat on render
    useEffect(() => {
        dispatch(updateChatBox([{Notice: "You've entered Primeval Forest."}]))
    }, [dispatch])

    // Checks for end of battle
    const [victory, setVictory] = useState(false)
    const introMonster = useSelector(state => state.battle.monster)
    useEffect(() => {
        introMonster.current_hp === 0 ? setVictory("done") : console.log()
    }, [introMonster])

    // Grab first map and monster from store
    let map = useSelector(state => state.images.maps.find(i => i.includes("primeval_forest")))
    let monster = {
        name: "vang_satyr",
        base_stats: {hp: 25, mp: 0, str: 25, dex: 25, int: 25, cri: 2, spd: 25, def: 25}
    }

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
        run: findImage("run"),
    }

    const stepSize = 24

    const switchAction = e => {
        const map1 = map1Pos - stepSize
        const map2 = map2Pos - stepSize
        const mon = monPos - stepSize
        switch(e.key) {
            case "d":
            case "ArrowRight":
                setMap1Pos(map1 <= -888 ? 888 : map1)
                setMap2Pos(map2 <= -888 ? 888 : map2)
                setMonPos(mon)
                mon === 640 ? handleAmbush() : console.log()
                dispatch(changePlayerStance((mon === 640 ? "idle" : "run")))
                break
            default:
                return
        }
    }

    const handleAmbush = () => {
        const stats = monster.base_stats
        let obj = {
            name: "vang_satyr",
            level: 3,
            current_hp: stats.hp,
            hp: stats.hp,
            current_mp: stats.mp,
            mp: stats.mp,
            str: stats.str,
            dex: stats.dex,
            int: stats.int,
            spd: stats.spd,
            def: stats.def,
            cri: stats.cri
        }
        
        dispatch(startBattle(obj))
        dispatch(updateChatBox([...chat, {Notice: "You've been ambushed by a Vang Satyr!"}]))
        dispatch(updateMapMonsters([obj]))
    }

    const oldChars = useSelector(state => state.characters.characters)
    const handleCompleteTutorial = () => {
        const obj = {
            level: 1,
            experience: 83
        }
        const oldPlayer = oldChars.find(c => c.id === player.id)
        let stats = {...oldPlayer.stats}
        Object.keys(stats).forEach(key => key === "cri" ? stats = {...stats, cri: stats.cri + 1} : stats = {...stats, [key]: stats[key] + 5})
        dispatch(updateCharacter(player, obj, oldChars, stats))
        setTimeout(() => {
            dispatch(goBackToTown())
        }, 2000)
    }

    useKeyUp(() => !inBattle ? dispatch(changePlayerStance(("idle"))) : null)
    useKeyDown(e => !inBattle ? switchAction(e) : null)

    return (
        <motion.div 
            className="battle-intro" 
            style={{backgroundColor: "lightgreen"}}
            initial="start"
            animate="end"
            variants={fadeIn}
        >
            <div className="map-container">
                <div className="map-back1" style={{backgroundImage: `url(${map})`, transform: `translate3d(${map1Pos}px, 0, 0)`}}/>
                <div className="map-back2" style={{backgroundImage: `url(${map})`, transform: `translate3d(${map2Pos}px, 0, 0)`}}/>
                <MonsterSprite monster={monster} position={monPos}/>
            </div>
            <div className="player-container">
                <img src={imageHash[action]} alt="player" style={{position: "absolute", width: "100%"}}/>
            </div>
            {   inBattle ?
                <>
                    <BattleInterface/>
                    <motion.div
                        initial="start"
                        animate="end"
                        style={{
                            position: "absolute",
                            top: "170px",
                            right: 0,
                            height: "200px",
                            textAlign: "center",
                            color: "yellow",
                        }}
                    >
                        {tips.map((tip, idx) => <motion.p variants={tipsVar(idx)} style={{margin: 5}} key={idx}>{tip}</motion.p>)}
                    </motion.div>
                </> : null
            }
            {   map1Pos > -96 ? 
                <motion.div
                    animate={dir1Var}
                    style={{
                        position: "absolute",
                        top: "-300px",
                        left: "300px",
                        width: "100px",
                        textAlign: "center",
                        color: "whitesmoke"
                    }}
                >
                    Hold down the Right Arrow key or the "D" key to move forward.
                </motion.div> : null
            }
            {   victory === "done" ?
                <motion.div animate={victoryVar} className="victory">
                    <h2>Tutorial Complete</h2>
                    <motion.button
                        className="victory-btn"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        animate={hover ? "effect" : "none"}
                        variants={victoryButtonVar}
                        onClick={handleCompleteTutorial}
                    >
                        <motion.p variants={victoryTextVar} animate={hover ? "effect" : "none"}>BACK TO AMAZEN</motion.p>
                        <motion.div className="svg" variants={victorySvgVar} animate={hover ? "effect" : "none"}>
                            <FaArrowAltCircleLeft size={hover ? 30 : 25} style={{marginRight: "5px"}}/>
                        </motion.div>
                    </motion.button>
                </motion.div> : null
            }
        </motion.div>
    )
}

export default BattleIntro

const dir1Var = {
    y: 500,
    transition: {delay: 0.3, type: "spring", bounce: 0}
}

const tips = [
    "BATTLE TIPS",
    "Use your default attack, an item, or a skill.", 
    'Press "I" to pull up your inventory',
    'Press "K" to pull up your skills',
    "For each move you do, the enemy will attack!",
    "You will always go first when using an item.",
    "Who attacks first is dependent on the speed stat.",
    "Killing a monster grants you exp and item(s)."
]

const tipsVar = idx => ({start: {x: 1000, opacity: 0}, end: {x: 0, opacity: 1, transition: {type: "spring", bounce: 0, delay: 3 + idx * 0.3}}})

const victoryVar = {
    y: 500,
    transition: {type: "spring", bounce: 0, duration: 2, delay: 3}
}

const victoryButtonVar = {effect: {transition: {duration: 0.3}}}
const victoryTextVar = {effect: {opacity: 0}}
const victorySvgVar = {effect: {x: "-40%", transition: {duration: 1, type: "spring", bounce: 0}}}

const fadeIn = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 1, ease: "easeInOut"}}
}