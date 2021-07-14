import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateChatBox } from "../actions/menuAction"
import { setCurrentMap } from "../actions/mapActions"
import { motion } from "framer-motion"
import { ImArrowLeft } from "react-icons/im/index.esm"

const Shop = ({player}) => {
    const dispatch = useDispatch()
    const sellers = useSelector(state => state.images.imageSrc.sellers)
    const monsters = useSelector(state => {
        let monstersObj = {}
        state.monsters.monsters.forEach(obj => monstersObj[obj.name] = obj)
        return monstersObj
    })
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")

    useEffect(() => {
        dispatch(updateChatBox([{Kyle: "Welcome back to Amazen."}]))
    }, [dispatch])

    const [hover, setHover] = useState(false)
    const [selectedMap, setSelectedMap] = useState(null)

    // Objects for each map
    const mapObj = {
        primeval_forest: {
            level: 1,
            monsters: [
                createMonsterObj(monsters.owr_satyr, 1, 1000), 
                createMonsterObj(monsters.vang_satyr, 3, 2080)
            ],
            map: "primeval_forest"
        },
        wychwood: {
            level: 3,
            monsters: [
                createMonsterObj(monsters.owr_satyr, 1, 1000),
                createMonsterObj(monsters.vang_satyr, 5, 2080),
                createMonsterObj(monsters.owr_satyr, 3, 3160)
            ],
            map: "wychwood"
        },
        aokigahara: {
            level: 5,
            monsters: [
                createMonsterObj(monsters.owr_satyr, 3, 1000),
                createMonsterObj(monsters.santri_satyr, 2, 2080),
                createMonsterObj(monsters.santri_satyr, 3, 3160)
            ],
            map: "aokigahara"
        },
        tranquil_falls: {
            level: 8,
            monsters: [
                createMonsterObj(monsters.maro_minotaur, 1, 1000),
                createMonsterObj(monsters.maro_minotaur, 3, 2080),
            ],
            map: "tranquil_falls"
        },
        twilight_woods: {
            level: 11,
            monsters: [
                createMonsterObj(monsters.griza_minotaur, 1, 1000),
                createMonsterObj(monsters.maro_minotaur, 2, 2080),
                createMonsterObj(monsters.griza_minotaur, 3, 3160),
                createMonsterObj(monsters.marmoreal_minotaur, 1, 4240)
            ],
            map: "twilight_woods"
        },
        hercule_peak: {
            level: 14,
            monsters: [
                createMonsterObj(monsters.marmoreal_minotaur, 1, 1000),
                createMonsterObj(monsters.marmoreal_minotaur, 3, 2080),
                createMonsterObj(monsters.marmoreal_minotaur, 5, 3160)
            ],
            map: "hercule_peak"
        },
        nix_village: {
            level: 16,
            monsters: [
                createMonsterObj(monsters.gidgee_golem, 5, 1000)
            ],
            map: "nix_village"
        },
        arctic_forest: {
            level: 19,
            monsters: [
                createMonsterObj(monsters.gidgee_golem, 5, 1000),
                createMonsterObj(monsters.stone_golem, 1, 2080),
                createMonsterObj(monsters.stone_golem, 3, 3160)
            ],
            map: "arctic_forest"
        },
        pere_noel: {
            level: 22,
            monsters: [
                createMonsterObj(monsters.stone_golem, 5, 1000),
                createMonsterObj(monsters.jade_golem, 5, 2080)
            ],
            map: "pere_noel"
        },
        elven_hideout: {
            level: 25,
            monsters: [
                createMonsterObj(monsters.vang_satyr, 8, 1000),
                createMonsterObj(monsters.owr_satyr, 5, 2080),
                createMonsterObj(monsters.santri_satyr, 4, 3160),
                createMonsterObj(monsters.arcane_wraith, 2, 4240)
            ],
            map: "elven_hideout"
        },
        arachnids_den: {
            level: 27,
            monsters: [
                createMonsterObj(monsters.occult_wraith, 1, 1000),
                createMonsterObj(monsters.pyro_wraith, 1, 2080),
                createMonsterObj(monsters.occult_wraith, 4, 3160)
            ],
            map: "arachnids_den"
        },
        spectral_grave: {
            level: 30,
            monsters: [
                createMonsterObj(monsters.pyro_wraith, 1, 1000),
                createMonsterObj(monsters.pyro_wraith, 3, 2080),
                createMonsterObj(monsters.pyro_wraith, 5, 3160)
            ],
            map: "spectral_grave"
        },
    }

    const handleMapChange = () => {
        dispatch(updateChatBox([{Notice: `You've entered ${formatName(selectedMap)}`}]))
        dispatch(setCurrentMap(selectedMap, mapObj[selectedMap].monsters))
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
            <motion.div 
                className="map-dropdown"
                onMouseEnter={() => {setHover(true);setSelectedMap(null)}}
                onMouseLeave={() => setHover(false)}
            >
                <div style={{border: hover ? "1px solid black" : null}}><p>Travel</p></div>
                {   hover ?
                    Object.keys(mapObj).filter(name => mapObj[name].level <= player.level).map((map, idx) => {
                        return (
                            <motion.div 
                                key={idx} 
                                className="map-name"
                                initial="start"
                                animate="end"
                                variants={mapNameVar(idx)}
                                onClick={() => {setSelectedMap(map);setHover(false)}}
                            >
                                <p>{formatName(map)}</p>
                            </motion.div>
                        )
                    }) : null
                }
            </motion.div>
            {   selectedMap ?
                <div 
                    className="end-tutorial" 
                    style={{left: "5px", width: "200px"}}
                    onClick={handleMapChange}
                >
                        <p style={{margin: 0}}>{formatName(selectedMap)}</p>
                        <ImArrowLeft size={40}/>
                </div> : null
            }
        </motion.div>
    )
}

export default Shop

const fadeIn = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 0.5, ease: "easeInOut"}}
}

const mapNameVar = idx => {
    return {
        start: {opacity: 0, y: -100},
        end: {opacity: 1, y: 0, transition: {duration: 0.05, delay: 0.075 * idx, ease: "easeInOut"}}
    }
}

// Creates monster object to send to store
const createMonsterObj = (monster, level, position) => {
    let mult = (Math.random() * (110 - 90 + 1) + 90)/100
    let stats = monster.base_stats
    let obj = {
        name: monster.name,
        level: level,
        current_hp: Math.floor(stats.hp * level * mult),
        hp: Math.floor(stats.hp * level * mult),
        current_mp: Math.floor(stats.mp * level * mult),
        mp: Math.floor(stats.mp * level * mult),
        str: Math.floor(stats.str * level * mult),
        dex: Math.floor(stats.dex * level * mult),
        int: Math.floor(stats.int * level * mult),
        spd: Math.floor(stats.spd * level * mult),
        def: Math.floor(stats.def * level * mult),
        cri: Math.floor(stats.cri * level * mult),
        exp: monster.base_exp * level,
        gold: monster.base_gold * level,
        position: position,
        drops: monster.drops.map(drop => ({...drop, amount: drop.amount * level}))
    }
    return obj
}