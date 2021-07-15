import React, { useEffect, useState } from "react"
import BattleInterface from "../interface/BattleInterface"
import MonsterSprite from "../components/MonsterSprite"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { useKeyDown, useKeyUp } from "../helpers/useKeyPress"
import { getRandom } from "../helpers/getRandom"
import { changePlayerStance, changeMonsterStance } from "../actions/stanceActions"
import { updateMapMonsters, updateMapDrops, setResult, goBackToTown } from "../actions/mapActions"
import { setCurrentCharacter } from "../actions/characterActions"
import { updateCharAndInventory } from "../actions/playerActions"
import { startBattle } from "../actions/battleActions"
import { updateChatBox } from "../actions/menuAction"
import { FaArrowAltCircleLeft } from "react-icons/fa/index.esm"

const TravelledMap = ({ player }) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.map)

    const { result, monsters, map, drops, items } = state
    const [hover, setHover] = useState(false)
    const [map1Pos, setMap1Pos] = useState(0)
    const [map2Pos, setMap2Pos] = useState(888)
    const [dialogue, setDialogue] = useState(null)

    const action = useSelector(state => state.stance.player)
    const chat = useSelector(state => state.menu.chat)
    const inBattle = useSelector(state => state.battle.inBattle)
    const oldChars = useSelector(state => state.characters.characters)
    const oldPlayer = oldChars.find(c => c.id === player.id)
    const currentMonster = useSelector(state => state.battle.monster)
    const expHash = useSelector(state => state.exp.exp)
    let mapImg = useSelector(state => state.images.maps.find(i => i.includes(map)))
    let images = useSelector(state => state.images.imageSrc[player.role])
    const findImage = stance => images.find(img => img.includes(stance))
    const itemImages = useSelector(state => state.images.items.items)
    const itemImage = item => itemImages.find(img => img.split(/[/|.]/)[3] === item.item)
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
    const imageHash = {
        attack: findImage("attack"),
        die: findImage("die"),
        hurt: findImage("hurt"),
        idle: findImage("idle"),
        run: findImage("run")
    }

    const handleAmbush = (monster) => {
        dispatch(startBattle(monster))
        dispatch(updateChatBox([...chat, {Notice: `You've been ambushed by a ${formatName(monster.name)}!`}]))
    }

    const stepSize = 24
    const switchAction = e => {
        const map1 = map1Pos - stepSize
        const map2 = map2Pos - stepSize
        let newMonsters = monsters.map(monster => ({...monster, position: monster.position - stepSize}))
        switch(e.key) {
            case "d":
            case "ArrowRight":
                setMap1Pos(map1 === -888 ? 888 : map1)
                setMap2Pos(map2 === -888 ? 888 : map2)
                dispatch(updateMapMonsters(newMonsters))
                dispatch(changePlayerStance((newMonsters.some(monster => monster.position === 640) ? "idle" : "run")))
                newMonsters.some(monster => monster.position === -200 ? dispatch(changeMonsterStance("idle")) : console.log())
                newMonsters.forEach(monster => {
                    monster.position === 640 ? handleAmbush(monster) : console.log()
                })
                break
            default:
                return
        }
    }

    useKeyUp(() => !result ? (!inBattle ? dispatch(changePlayerStance(("idle"))) : null) : null)
    useKeyDown(e => !result ? (!inBattle ? switchAction(e) : null) : dispatch(changePlayerStance(("idle"))))

    useEffect(() => {
        if (monsters.every(monster => monster.current_hp === 0)) dispatch(setResult("victory"))
    }, [monsters, dispatch])

    useEffect(() => {
        if (player.stats.current_hp === 0) dispatch(setResult("defeat"))
    },[player, dispatch])

    useEffect(() => {
        if (currentMonster.current_hp === 0) {
            const exp = currentMonster.exp + player.experience
            const monsterDrops = getRandom(currentMonster.drops, Math.floor(currentMonster.drops.length/1.5))
            let stats = {...oldPlayer.stats}
            let level = player.level
            exp >= expHash[level + 1] ? level = parseInt(Object.keys(expHash).reverse().find(level => exp >= expHash[level])) : console.log()
            const levelDiff = level - oldPlayer.level
            let newDrops = [...drops]
            Object.keys(stats).forEach(key => {
                key === "cri" ? stats = {...stats, cri: stats.cri + (1 * levelDiff)} : stats = {...stats, [key]: stats[key] + (5 * levelDiff)}
            })
            stats = {...stats, current_hp: stats.hp, current_mp: stats.mp}
            monsterDrops.forEach(drop => {
                if (!newDrops.some(d => d.item === drop.item)) {
                    newDrops.push(drop)
                } else {
                    newDrops = newDrops.map(d => d.item === drop.item ? {...d, amount: d.amount + drop.amount} : d)
                }
            })
            const dropMessage = () => {
                let arr = monsterDrops.map(drop => `${drop.amount} ${formatName(drop.item)}`)
                arr[arr.length - 1] = `and ${arr[arr.length -1]}`
                arr[0] = arr.length > 1 ? `, ${arr[0]}` : ` ${arr[0]}`
                return arr.length > 1 ? arr.join(", ") : arr.join(" ")
            }

            setTimeout(() => {
                dispatch(setCurrentCharacter({
                    ...player, 
                    gold: player.gold + currentMonster.gold, 
                    level: level,
                    experience: exp,
                    stats: level > player.level ? stats : player.stats
                }))
                dispatch(updateMapDrops(newDrops))
                setDialogue({Message: `You've gained ${currentMonster.exp} experience for defeating the ${formatName(currentMonster.name)}`})
                if (level > player.level) setTimeout(() => setDialogue({Message: `You are now level ${level}. Any buffs have been removed.`}), 200)
                setTimeout(() => setDialogue({Message: `The ${formatName(currentMonster.name)} dropped ${currentMonster.gold} gold${dropMessage()}`}), 500)
            }, 2000)
        }
    }, [currentMonster])

    useEffect(() => {
        if (dialogue) dispatch(updateChatBox([...chat, dialogue]))
    }, [dialogue])

    const handleVictory = () => {
        const newStats = () => {
            const levelDiff = player.level - oldPlayer.level
            let stats = {...oldPlayer.stats}
            if (levelDiff) {
                Object.keys(stats).forEach(key => {
                    key === "cri" ? stats = {...stats, cri: stats.cri + (1 * levelDiff)} : stats = {...stats, [key]: stats[key] + (5 * levelDiff)}
                })
            }
            return {...stats, current_hp: player.stats.current_hp, current_mp: player.stats.current_mp}
        }
        let invObj = {}
        drops.forEach(drop => invObj[drop.item] = drop.amount)
        Object.keys(items).forEach(item => {
            invObj[item] = (invObj[item] || 0) -items[item]
        })

        let charObj = {
            experience: player.experience - oldPlayer.experience,
            gold: player.gold - oldPlayer.gold,
            level: player.level - oldPlayer.level
        }

        dispatch(updateCharAndInventory(player, charObj, invObj, oldChars, newStats()))
        setTimeout(() => dispatch(goBackToTown()), 300)
    }

    const handleDefeat = () => {
        const newStats = () => {
            const levelDiff = player.level - oldPlayer.level
            let stats = {...oldPlayer.stats}
            if (levelDiff) {
                Object.keys(stats).forEach(key => {
                    key === "cri" ? stats = {...stats, cri: stats.cri + (1 * levelDiff)} : stats = {...stats, [key]: stats[key] + (5 * levelDiff)}
                })
            }
            return {...stats, current_hp: stats.hp, current_mp: stats.mp}
        }

        let invObj = {}
        Object.keys(items).forEach(item => {
            invObj[item] = (invObj[item] || 0) -items[item]
        })

        let charObj = {
            experience: player.experience - oldPlayer.experience,
            gold: -player.gold/3,
            level: player.level - oldPlayer.level
        }

        const newChat = [...chat, {Cupid: "My pocket seems a lot lighter. I lost all the items from that trip and a ton of gold."}]
        dispatch(updateCharAndInventory(player, charObj, invObj, oldChars, newStats()))
        setTimeout(() => dispatch(goBackToTown(newChat)), 300)
    }

    return (
        <motion.div
            className="battle-intro" 
            style={{backgroundColor: bgColor[map]}}
            initial="start"
            animate="end"
            variants={fadeIn}
        >
             <div className="map-container">
                <div className="map-back1" style={{backgroundImage: `url(${mapImg})`, transform: `translate3d(${map1Pos}px, 0, 0)`}}/>
                <div className="map-back2" style={{backgroundImage: `url(${mapImg})`, transform: `translate3d(${map2Pos}px, 0, 0)`}}/>
                {monsters.map((monster, idx) => <MonsterSprite key={idx} monster={monster} position={monster.position}/>)}
            </div>
            <div className="player-container">
                <img src={imageHash[action]} alt="player" style={{position: "absolute", width: "100%"}}/>
            </div>
            { inBattle ? <BattleInterface/> : null }
            {   result ?
                <motion.div animate={victoryVar} className="victory">
                    {result === "victory" ? <h2>Victory</h2> : <h2 style={{color: "maroon"}}>Defeat</h2>}
                    <motion.button
                        className="victory-btn"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        animate={hover ? "effect" : "none"}
                        variants={victoryButtonVar}
                        onClick={result === "victory" ? handleVictory : handleDefeat}
                    >
                        <motion.p variants={victoryTextVar} animate={hover ? "effect" : "none"}>BACK TO AMAZEN</motion.p>
                        <motion.div className="svg" variants={victorySvgVar} animate={hover ? "effect" : "none"}>
                            <FaArrowAltCircleLeft size={hover ? 30 : 25} style={{marginRight: "5px"}}/>
                        </motion.div>
                    </motion.button>
                </motion.div> : null
            }
            <div className="drops-container">
                <h6>Drops</h6>
                <div className="drops">
                {   drops.map((item, idx) => {
                        return (
                            <motion.div 
                                key={idx} 
                                className="item-icon" 
                                style={{backgroundImage: `url(${itemImage(item)})`}}
                                initial="start"
                                animate="end"
                                variants={itemVar}
                            >
                                <p style={{color: "white", transform: "translateY(-15px)"}}>{item.amount}</p>
                            </motion.div>
                        )
                    })
                }
                </div>
            </div>
        </motion.div>
    )
}

export default TravelledMap

const fadeIn = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 1, ease: "easeInOut"}}
}

const victoryVar = {
    y: 500,
    transition: {type: "spring", bounce: 0, duration: 2, delay: 2}
}

const victoryButtonVar = {effect: {transition: {duration: 0.3}}}
const victoryTextVar = {effect: {opacity: 0}}
const victorySvgVar = {effect: {x: "-40%", transition: {duration: 1, type: "spring", bounce: 0}}}

const itemVar = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {delay: 1.5, duration: 0.5, ease: "easeInOut"}}
}

const bgColor = {
    primeval_forest: "lightgreen",
    wychwood: "lightgreen",
    aokigahara: "lightgreen",
    tranquil_falls: "lightblue",
    twilight_woods: "lightblue",
    hercule_peak: "lightblue",
    nix_village: "whitesmoke",
    arctic_forest: "whitesmoke",
    pere_noel: "whitesmoke",
    elven_hideout: "#B19CD9",
    arachnids_den: "#B19CD9",
    spectral_grave: "#B19CD9",
}