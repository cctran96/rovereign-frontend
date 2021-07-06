import React from "react"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"

const InventoryMenu = ({player}) => {
    const show = useSelector(state => state.menu.inventory)
    const images = useSelector(state => state.images.items.items)

    const inventory = () => {
        let placeholder = [...player.inventory]
        while (placeholder.length < 28) {
            placeholder.push({})
        }
        return placeholder
    }

    const itemImage = item => {
        if (!item.item) return
        const image = images.find(img => img.includes(item.item.name))
        return image
    }

    return (
        <motion.div className="inventory-menu" variants={menuVar} animate={show ? "open" : "closed"}>
            {   show ?
                <>
                    {inventory().map(item => {
                        return (
                            <div className="skill-icon" style={{backgroundImage: `url(${itemImage(item)})`}}>
                                <p style={{color: "white", transform: "translateY(-15px)"}}>{item.amount}</p>
                            </div>
                        )
                    })}
                </> : null
            }
        </motion.div>
    )
}

export default InventoryMenu

const menuVar = {
    open: {opacity: 1, transition: {duration: 0.7}},
    closed: {opacity: 0}
}