import React from "react"
import { useSelector } from "react-redux"

const MonsterSprite = ({ monster, position, stance }) => {
    const images = useSelector(state => state.images.imageSrc[monster.name])
    const frames = useSelector(state => state.images.typeInfo[monster.name.split("_")[1]])
    const imgSize = idx => parseInt(frames.size.split("x")[idx])/2.5
    const findImage = stance => images.find(img => img.includes(stance))
    const imageHash = {
        attack: findImage("attack"),
        die: findImage("die"),
        hurt: findImage("hurt"),
        idle: findImage("idle"),
        taunt: findImage("taunt"),
        walk: findImage("walk")
    }

    return (
        <div 
            className="monster" 
            style={{
                backgroundImage: `url(${imageHash[stance]})`, 
                width: `${imgSize(0)}px`, 
                height: `${imgSize(1)}px`,
                transform: `translate3d(${position}px, 0, 0) scaleX(-1)`,
            }}
        />
    )
}

export default MonsterSprite