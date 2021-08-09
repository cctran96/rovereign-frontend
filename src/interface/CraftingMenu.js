import React, { useState } from "react"
import { motion } from "framer-motion"
import { IoMdClose } from "react-icons/io"
import { updateInventory } from "../actions/playerActions"
import { useDispatch } from "react-redux"

const CraftingMenu = ({show, setShow, items, itemImage, formatName, player, oldChars}) => {
    const dispatch = useDispatch()
    const [tier, setTier] = useState(1)
    const [mats, setMats] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const potions = items.filter(item => item.name.includes("potion"))
    const tier1 = potions.slice(0, 5)
    const tier2 = potions.slice(5)
    const tier3 = items.filter(item => item.name.includes("elixir"))

    const closeWindow = () => {
        setShow(false)
        setTier(1)
        setMats(null)
        setSelectedItem(null)
    }

    const switchTier = tier => {
        setTier(tier)
        setMats(null)
        setSelectedItem(null)
    }

    const handleSetMaterials = item => {
        let arr = item.effect.craft[0].split(", ")
        const materials = arr.map(item => {
            let array = item.split(" ")
            return {name: array[1], amount: array[0]}
        })
        setMats(materials)
        setSelectedItem(item.name)
    }

    const inventoryAmount = item => {
        const found = player.inventory.find(i => i.item === item.name)
        return found ? found.amount : 0
    }

    const checkAllAmounts = mats ? mats.every(item => inventoryAmount(item) >= item.amount) : null

    const handleCraftItem = () => {
        let obj = {
            [selectedItem]: 1,
        }
        mats.forEach(item => obj[item.name] = -item.amount)
        dispatch(updateInventory(player, obj, oldChars))
    }

    return (
        <div className="confirm-overlay" style={{display: show ? "block" : "none"}}>
            <motion.div className="crafting-menu" variants={confirmVar} animate={show ? "show" : "hidden"}>
                {   show ?
                    <>
                        <div className="close-button">
                            <IoMdClose onClick={closeWindow} size={35}/>
                        </div>
                        <h2>Crafting Table</h2>
                        <div className="crafting-container">
                            <div className="crafting-options">
                                <p style={{color: tier === 1 ? "#CD634C" : "black"}} onClick={() => switchTier(1)}>Tier 1</p>
                                <p style={{color: tier === 2 ? "silver" : "black"}} onClick={() => switchTier(2)}>Tier 2</p>
                                <p style={{color: tier === 3 ? "gold" : "black"}} onClick={() => switchTier(3)}>Tier 3</p>
                            </div>
                            <div className="crafting-table">
                                <div className="crafting-items">
                                {   tier === 1 ?
                                    tier1.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="item-icon" 
                                            onClick={() => handleSetMaterials(item)}
                                            style={{cursor: "pointer", backgroundImage: `url(${itemImage(item)})`, position: "relative"}}
                                        >
                                            <p style={{color: "white", left: 0, position: "absolute", transform: "translateY(-15px)"}}>{inventoryAmount(item)}</p>
                                        </div>
                                    )) : 
                                    (tier === 2 ? 
                                    tier2.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="item-icon" 
                                            onClick={() => handleSetMaterials(item)}
                                            style={{cursor: "pointer", backgroundImage: `url(${itemImage(item)})`, position: "relative"}}
                                        >
                                            <p style={{color: "white", left: 0, position: "absolute", transform: "translateY(-15px)"}}>{inventoryAmount(item)}</p>
                                        </div>
                                    )) :
                                    (tier === 3 ?
                                    tier3.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="item-icon" 
                                            onClick={() => handleSetMaterials(item)}
                                            style={{cursor: "pointer", backgroundImage: `url(${itemImage(item)})`, position: "relative"}}
                                        >
                                            <p style={{color: "white", left: 0, position: "absolute", transform: "translateY(-15px)"}}>{inventoryAmount(item)}</p>
                                        </div>
                                    )): null))
                                }
                                </div>
                                <div className="craft-materials">
                                    <div className="ingredient-container">
                                        {   mats ? 
                                            mats.map((item, idx) => (
                                                <div className="ingredient" key={idx}>
                                                    <p>{formatName(item.name)}</p>
                                                    <div 
                                                        className="item-icon"
                                                        style={{backgroundImage: `url(${itemImage(item)})`, position: "relative"}}
                                                    >
                                                        <p style={{color: "white", left: 0, position: "absolute", transform: "translateY(-15px)"}}>{item.amount}</p>
                                                    </div>
                                                    <p>You have: <b style={{fontSize: "20px", color: inventoryAmount(item) >= item.amount ? "green" : "red"}}>{inventoryAmount(item)}</b></p>
                                                </div>
                                            )) : null
                                        }
                                    </div>
                                    {   mats ? 
                                        <div className="craft-button" style={{color: checkAllAmounts ? "green" : "red"}}>
                                            {
                                                checkAllAmounts ? 
                                                <p className="success" onClick={handleCraftItem}>CRAFT</p> : 
                                                <p style={{cursor: "default"}}>NOT ENOUGH MATS</p>
                                            }
                                        </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </> : null 
                }
            </motion.div>
        </div>
    )
}

export default CraftingMenu

// Confirm Box Variant
const confirmVar = {
    show: {
        opacity: 1, 
        y: 0, 
        transition: {
            type: "spring",
            bounce: 0
        }
    },
    hidden: {
        opacity: 0, y: -700}
}

const closeVar = {
    open: {opacity: 1, y: 0, transition: {duration: 0.7, delay: 0.5}},
    closed: {opacity: 0, y: -100}
}