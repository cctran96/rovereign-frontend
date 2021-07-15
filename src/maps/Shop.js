import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateChatBox } from "../actions/menuAction"
import { setCurrentMap } from "../actions/mapActions"
import CraftingMenu from "../interface/CraftingMenu"
import { upgradeCharacter, updateCharAndInventory } from "../actions/playerActions"
import { motion } from "framer-motion"
import { ImArrowLeft } from "react-icons/im/index.esm"
import { IoMdClose, IoMdArrowRoundBack } from "react-icons/io"

const Shop = ({player}) => {
    const dispatch = useDispatch()
    const items = useSelector(state => state.details.items)
    const images = useSelector(state => state.images.items.items)
    const oldChars = useSelector(state => state.characters.characters)
    const charDetails = useSelector(state => state.details.characters)
    const chat = useSelector(state => state.menu.chat)
    const sellers = useSelector(state => state.images.imageSrc.sellers)
    const goldImg = useSelector(state => state.images.items.gold[0])
    const monsters = useSelector(state => {
        let monstersObj = {}
        state.monsters.monsters.forEach(obj => monstersObj[obj.name] = obj)
        return monstersObj
    })
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")

    useEffect(() => {
        dispatch(updateChatBox([...chat, {Kyle: "Welcome back to Amazen."}]))
    }, [dispatch])

    const [hover, setHover] = useState(false)
    const [selectedMap, setSelectedMap] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [showCraft, setShowCraft] = useState(false)
    const [hoveredItem, setHoveredItem] = useState(null)
    const [buyOrSell, setBuyOrSell] = useState(null)

    const handleMapChange = () => {
        dispatch(updateChatBox([{Notice: `You've entered ${formatName(selectedMap)}`}]))
        dispatch(setCurrentMap(selectedMap, mapObj(monsters)[selectedMap].monsters))
    }

    const handleCloseShop = e => {
        if (e.target.className === ("shop-container open")) {
            setIsOpen(!isOpen)
            setBuyOrSell(null)
        }
    }

    const itemImage = item => {
        if (!item.name) return
        const image = images.find(img => img.split(/[/|.]/)[3] === item.name)
        return image
    }

    const handleHoverItem = e => {
        const item = e.target.className.split(" ")[1]
        setHoveredItem(item)
    }

    const handleBuyItem = e => {
        let item = e.target.getAttribute("item")
        let cost = parseInt(e.target.getAttribute("cost"))
        if (player.gold < cost) return
        dispatch(updateCharAndInventory(player, {gold: -cost}, {[item]: 1}, oldChars))
    }

    const handleSellItem = e => {
        let item = e.target.getAttribute("item")
        let cost = parseInt(e.target.getAttribute("cost"))
        dispatch(updateCharAndInventory(player, {gold: cost}, {[item]: -1}, oldChars))
    }

    const classArr = () => {
        const key = Object.keys(classObj).find(key => classObj[key].includes(player.role))
        return classObj[key]
    }

    const handleUpgrade = () => {
        if (player.role === classArr()[0]) {
            if (player.gold < 25000) {
                dispatch(updateChatBox([...chat, {Notice: "Upgrading your class requires 25k."}]))
            } else {
                let stats = charDetails.find(char => char.role === classArr()[1]).base_stats
                let diff = player.level - 1
                Object.keys(stats).forEach(key => {
                    key === "cri" ? stats = {...stats, cri: stats.cri + (1 * diff)} : stats = {...stats, [key]: stats[key] + (5 * diff)}
                })
                stats = {...stats, current_hp: stats.hp, current_mp: stats.mp}
                dispatch(upgradeCharacter({id: player.id, character: classArr()[1], gold: player.gold - 25000, stats: stats}, oldChars))
            }
        } else if (player.role === classArr()[1]) {
            if (player.gold < 100000) {
                dispatch(updateChatBox([...chat, {Notice: "Upgrading your class requires 100k."}]))
            } else {
                let stats = charDetails.find(char => char.role === classArr()[2]).base_stats
                let diff = player.level - 1
                Object.keys(stats).forEach(key => {
                    key === "cri" ? stats = {...stats, cri: stats.cri + (1 * diff)} : stats = {...stats, [key]: stats[key] + (5 * diff)}
                })
                stats = {...stats, current_hp: stats.hp, current_mp: stats.mp}
                dispatch(upgradeCharacter({id: player.id, character: classArr()[2], gold: player.gold - 100000, stats: stats}, oldChars))
            }
        }
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
                className="shop" 
                onClick={() => setIsOpen(true)}
                animate={isOpen ? "open" : "closed"}
                variants={openVar}
            >
                <p>Shop</p>
            </motion.div>
            <motion.div 
                className="map-dropdown"
                onMouseEnter={() => {setHover(true);setSelectedMap(null)}}
                onMouseLeave={() => setHover(false)}
            >
                <div className="travel" style={{backgroundColor: hover ? "rgba(0, 0, 0, 0.4)" : null}}>
                    <p>Travel</p>
                </div>
                {   hover ?
                    Object.keys(mapObj(monsters)).filter(name => mapObj(monsters)[name].level <= player.level).map((map, idx) => {
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
            <div 
                onClick={handleCloseShop} 
                className={`shop-container ${isOpen ? "open" : "closed"}`} 
                style={{display: isOpen ? "block" : "none"}}
            >
                <motion.div className="shop-menu" animate={isOpen ? "open" : "closed"} variants={menuVar}>
                    <div className="shop-buttons">
                        {   buyOrSell ? 
                            <motion.div className="back-button" initial="closed" animate="open" variants={closeVar}>
                                <IoMdArrowRoundBack onClick={() => setBuyOrSell(null)} size={35}/>
                            </motion.div> : null
                        }
                        <motion.div className="close-button" variants={closeVar}>
                            <IoMdClose onClick={() => setIsOpen(false)} size={35}/>
                        </motion.div>
                    </div>
                    {   !buyOrSell ?
                        <div className="shop-options">
                            <motion.p onClick={() => setBuyOrSell("buy")}>Buy</motion.p>
                            <motion.p onClick={() => setBuyOrSell("sell")}>Sell</motion.p>
                        </div> : null
                    }
                    <motion.div className="shop-items" animate={isOpen ? "open" : "closed"}>
                        {   buyOrSell === "buy" ? 
                            items.map((item, idx) => (
                                <motion.div 
                                    key={idx} 
                                    className={`shop-item ${item.name}`} 
                                    onMouseEnter={handleHoverItem} 
                                    onMouseLeave={() => setHoveredItem(null)}
                                    initial="start"
                                    animate="end"
                                    variants={itemVar(idx)}
                                >
                                    <p style={{marginLeft: "5px", display: hoveredItem === item.name ? "none" : "block"}}>
                                        {formatName(item.name)}
                                    </p>
                                    <div className={`shop-gold ${item.name}`}>
                                        <p>{item.cost}</p>
                                        <div className="gold-img" style={{backgroundImage: `url(${goldImg})`}}/>
                                    </div>
                                    <div 
                                        className="buy-button"
                                        item={item.name}
                                        cost={item.cost}
                                        onClick={handleBuyItem}
                                        style={{
                                            display: hoveredItem === item.name ? "flex" : "none",
                                            color: item.cost <= player.gold ? "green" : "red",
                                            cursor: item.cost <= player.gold ? "pointer" : "default"
                                        }}
                                    >
                                        {item.cost <= player.gold ? "BUY" : "NOT ENOUGH GOLD"}
                                    </div>
                                </motion.div>
                            )) : null
                        }
                        {   buyOrSell === "sell" ?
                            player.inventory.filter(i => i.amount > 0).map((item,idx) => (
                                <motion.div 
                                    key={idx} 
                                    className={`shop-item ${item.item}`} 
                                    onMouseEnter={handleHoverItem} 
                                    onMouseLeave={() => setHoveredItem(null)}
                                    initial="start"
                                    animate="end"
                                    variants={itemVar(idx)}
                                >
                                    <p style={{marginLeft: "5px", display: hoveredItem === item.item ? "none" : "block"}}>
                                        {formatName(item.item)}
                                    </p>
                                    <div className={`shop-gold ${item.item}`}>
                                        <p>{items.find(i => i.name === item.item).cost/2}</p>
                                        <div className="gold-img" style={{backgroundImage: `url(${goldImg})`}}/>
                                    </div>
                                    <div 
                                        className="sell-button"
                                        item={item.item}
                                        cost={items.find(i => i.name === item.item).cost/2}
                                        onClick={handleSellItem}
                                        style={{
                                            display: hoveredItem === item.item ? "flex" : "none",
                                            color: "gold",
                                            cursor: "pointer"
                                        }}
                                    >
                                        SELL
                                    </div>
                                </motion.div> 
                            )): null
                        }
                    </motion.div>
                    {   hoveredItem ?
                        <div className="shop-tool-tip">
                            <p>{formatName(hoveredItem)}</p>
                            <div className="item-icon" style={{backgroundImage: `url(${itemImage(items.find(i => i.name === hoveredItem))})`}}/>
                            <p style={{margin: "5px"}}>{items.find(i => i.name === hoveredItem).description}</p>
                            <p style={{marginTop: "auto"}}>
                                You have: <b>{player.inventory.find(i => i.item === hoveredItem) ? player.inventory.find(i => i.item === hoveredItem).amount : 0}</b>
                            </p>
                        </div> : null
                    }
                </motion.div>
            </div>
            <div className="upgrade">
                { 
                    player.level > 9 && player.role === classArr()[0] ? 
                    <p onClick={handleUpgrade}>Upgrade to {formatName(classArr()[1])}</p> 
                    : null 
                }
                { 
                    player.level > 19 && player.role === classArr()[1] ? 
                    <p onClick={handleUpgrade}>Upgrade to {formatName(classArr()[2])}</p> 
                    : null 
                }
            </div>
            <p className="craft" onClick={() => setShowCraft(true)}>Craft</p>
            <CraftingMenu show={showCraft} setShow={setShowCraft} items={items} itemImage={itemImage} formatName={formatName} player={player} oldChars={oldChars}/>
        </motion.div>
    )
}

export default Shop

const classObj = {
    knight: ["spearman", "crusader", "hero"],
    archer: ["hunter", "crossbowman", "robinhood"],
    wizard: ["magician", "sorcerer", "elysianist"]
}

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

const openVar = {
    open: {y: -100, opacity: 0},
    closed: {opacity: 1, y: 0, transition: {duration: 0.7}}
}

const closeVar = {
    open: {opacity: 1, y: 0, transition: {duration: 0.7, delay: 0.5}},
    closed: {opacity: 0, y: -100}
}

const menuVar = {
    open: {
        opacity: 1, 
        x: 0, 
        transition: {
            type: "spring",
            bounce: 0
        }
    },
    closed: {
        opacity: 0, x: 1000}
}

const itemVar = idx => {
    return {
        start: {opacity: 0},
        end: {opacity: 1, transition: {duration: 0.2, delay: 0.1 * idx}}
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

// Objects for each map
const mapObj = monsters => {
    return {
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
                createMonsterObj(monsters.marmoreal_minotaur, 2, 4240)
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
        }
    }
}