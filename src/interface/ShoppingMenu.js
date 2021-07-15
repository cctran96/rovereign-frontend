import React, { useState } from "react"
import { motion } from "framer-motion"
import { IoMdClose, IoMdArrowRoundBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { updateCharAndInventory } from "../actions/playerActions"

const ShoppingMenu = ({player, oldChars, formatName, items, itemImage, isOpen, setIsOpen}) => {
    const dispatch = useDispatch()
    const [hoveredItem, setHoveredItem] = useState(null)
    const [buyOrSell, setBuyOrSell] = useState(null)

    const goldImg = useSelector(state => state.images.items.gold[0])

    const handleCloseShop = e => {
        if (e.target.className === ("shop-container open")) {
            setIsOpen(!isOpen)
            setBuyOrSell(null)
        }
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

    return (
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
                        <IoMdClose onClick={() => {setIsOpen(false); setBuyOrSell(null)}} size={35}/>
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
                                    <p>SELL</p>
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
    )
}

export default ShoppingMenu

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
        end: {opacity: 1, transition: {duration: 0.1, delay: 0.05 * idx}}
    }
}