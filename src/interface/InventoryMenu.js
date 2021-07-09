import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMove } from "../actions/battleActions"

const InventoryMenu = ({player}) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.menu.inventory)
    const images = useSelector(state => state.images.items.items)
    const inBattle = useSelector(state => state.battle.inBattle)
    // const itemInfo = useSelector(state => )

    const inventory = () => {
        let placeholder = [...player.inventory]
        while (placeholder.length < 28) {
            placeholder.push({})
        }
        return placeholder
    }

    const itemImage = item => {
        if (!item.item) return
        const image = images.find(img => img.includes(item.item))
        return image
    }

    const handleClick = item => {
        if (inBattle && item.item) dispatch(selectMove({item: item.item}))
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