import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMove } from "../actions/battleActions"

const InventoryMenu = ({player}) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.menu.inventory)
    const images = useSelector(state => state.images.items.items)
    const inBattle = useSelector(state => state.battle.inBattle)

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

    const handleClick = item => {
        if (inBattle) dispatch(selectMove({item: item}))
    }

    const formattedName = item => {
        return item.item.name
    }

    return (
        show ?
        <div className="inventory-menu">
            {inventory().map((item, idx) => {
                return (
                    <div 
                        key={idx} 
                        className="item-icon" 
                        style={{backgroundImage: `url(${itemImage(item)})`}}
                        onClick={() => handleClick(formattedName(item))}
                    >
                        <p style={{color: "white", transform: "translateY(-15px)"}}>{item.amount}</p>
                    </div>
                )
            })}
        </div> : null
    )
}

export default InventoryMenu