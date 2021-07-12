import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMove } from "../actions/battleActions"

const InventoryMenu = ({player}) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.menu.inventory)
    const images = useSelector(state => state.images.items.items)
    const inBattle = useSelector(state => state.battle.inBattle)
    const display = useSelector(state => state.battle.display)
    const allItems= useSelector(state => state.details.items)

    const inventory = () => {
        let placeholder = [...player.inventory]
        placeholder = placeholder.filter(i => i.amount > 0)
        while (placeholder.length < 28) {
            placeholder.push({})
        }
        return placeholder
    }

    const itemImage = item => {
        if (!item.item) return
        const image = images.find(img => img.split(/[/|.]/)[3] === item.item)
        return image
    }

    const handleClick = item => {
        if (!display && inBattle && item.item) {
            allItems.find(i => i.name === item.item).effect ?
            dispatch(selectMove({item: item.item})) : console.log()
        }
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
                        onClick={() => handleClick(item)}
                    >
                        <p style={{color: "white", transform: "translateY(-15px)"}}>{item.amount}</p>
                    </div>
                )
            })}
        </div> : null
    )
}

export default InventoryMenu