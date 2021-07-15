import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMove } from "../actions/battleActions"

const InventoryMenu = ({player}) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.menu.inventory)
    const images = useSelector(state => state.images.items.items)
    const inBattle = useSelector(state => state.battle.inBattle)
    const display = useSelector(state => state.battle.display)
    const allItems= useSelector(state => state.details.items)
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")

    const [hoveredItem, setHoveredItem] = useState(null)

    const inventory = () => {
        let placeholder = [...player.inventory]
        placeholder = placeholder.filter(i => i.amount > 0)
        while (placeholder.length < 30) {
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

    const handleHover = e => {
        const item = e.target.closest("div").getAttribute("item")
        if (item) setHoveredItem(item)
    }

    useEffect(() => {
        if (!show) setHoveredItem(null)
    }, [show])

    return (
        show ?
        <div className="inventory-menu">
            {inventory().map((item, idx) => {
                const found = allItems.find(i => i.name === item.item)
                return (
                    <div 
                        key={idx} 
                        className="item-icon" 
                        style={{backgroundImage: `url(${itemImage(item)})`, position: "relative", cursor: found && found.effect ? "pointer" : "default"}}
                        onClick={() => handleClick(item)}
                        item={item.item}
                        onMouseEnter={handleHover}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        <p style={{color: "white", transform: "translateY(-15px)"}}>{item.amount}</p>
                        {   found ?
                            <div className="tool-tip" style={{display: hoveredItem === item.item ? "block" : "none"}}>
                                <p>{formatName(item.item)}</p>
                                <div className="item-icon" style={{marginTop: "10px", marginLeft: "75px", backgroundImage: `url(${itemImage(item)})`}}/>
                                <p>{found.description}</p>
                            </div> : null
                        }
                    </div>
                )
            })}
        </div> : null
    )
}

export default InventoryMenu