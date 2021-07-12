import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateChatBox } from "../actions/menuAction"
import { motion } from "framer-motion"

const Shop = ({player}) => {
    const dispatch = useDispatch()
    const sellers = useSelector(state => state.images.imageSrc.sellers)
    const monsters = useSelector(state => {
        let monstersObj = {}
        state.monsters.monsters.forEach(obj => monstersObj[obj.name] = obj)
        return monstersObj
    })

    useEffect(() => {
        dispatch(updateChatBox([{Kyle: "Welcome back to Amazen."}]))
    }, [])

    // Objects for each map
    const mapObj = {
        primeval_forest: {
            level: 1,
            monsters: [createMonsterObj(monsters.vang_satyr, 1), createMonsterObj(monsters.vang_satyr, 3)],
            map: "primeval_forest"
        },
        wychwood: {
            level: 3,
        },
        aokigahara: {
            level: 5,
        },
        tranquil_falls: {
            level: 8,
        },
        twilight_woods: {
            level: 11,
        },
        hercule_peak: {
            level: 14,
        },
        nix_village: {
            level: 16,
        },
        arctic_forest: {
            level: 19,
        },
        pere_noel: {
            level: 22,
        },
        elven_hideout: {
            level: 25,
        },
        arachnids_den: {
            level: 27,
        },
        spectral_grave: {
            level: 30,
        },
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
            <motion.div className="map-dropdown">

            </motion.div>
        </motion.div>
    )
}

export default Shop

const fadeIn = {
    start: {opacity: 0},
    end: {opacity: 1, transition: {duration: 0.5, ease: "easeInOut"}}
}

// Creates monster object to send to store
const createMonsterObj = (monster, level) => {
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
        cri: Math.floor(stats.cri * level * mult)
    }
    return obj
}