import React from "react"
import { useSelector } from "react-redux"

const MonsterSprite = ({ monster, position }) => {
    const images = useSelector(state => state.images.imageSrc[monster.name])
    const frames = useSelector(state => state.images.typeInfo[monster.name.split("_")[1]])
    const stance = useSelector(state => state.stance.monster)
    const imgSize = idx => parseInt(frames.size.split("x")[idx])/2.5
    const findImage = stance => images.find(img => img.includes(stance))
    const imageHash = {
        attack: findImage("attack"),
        die: findImage("die"),
        hurt: findImage("hurt"),
        idle: findImage("idle"),
    }

    return (
        <div>
            <div className="sprite-overlay"/>
            <img
                src={imageHash[stance]}
                style={{
                    width: `${imgSize(0)}px`, 
                    height: `${imgSize(1)}px`,
                    transform: `translate3d(${position}px, 0, 0) scaleX(-1)`,
                    position: "absolute",
                    bottom: 0
                }}
                alt="monster"
            />
        </div>
    )
}

export default MonsterSprite