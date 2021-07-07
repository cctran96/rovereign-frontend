import React from "react"
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
        show ?
        <div className="inventory-menu">
            {inventory().map((item, idx) => {
                return (
                    <div key={idx} className="skill-icon" style={{backgroundImage: `url(${itemImage(item)})`}}>
                        <p style={{color: "white", transform: "translateY(-15px)"}}>{item.amount}</p>
                    </div>
                )
            })}
        </div> : null
    )
}

export default InventoryMenu