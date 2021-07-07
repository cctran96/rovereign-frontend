import React, { useState } from "react"
import { useSelector } from "react-redux"
import UserInterface from "../components/UserInterface"
import { useKeyDown, useKeyUp } from "../helpers/useKeyPress"

const BattleIntro = ({player}) => {
    // State for character's current action and position
    const [action, setAction] = useState("idle")

    // State for map positions
    const [map1Pos, setMap1Pos] = useState(0)
    const [map2Pos, setMap2Pos] = useState(880)

    // Grab first map from store
    let map = useSelector(state => state.images.maps.find(i => i.includes("primeval_forest")))

    // Images for character
    let images = useSelector(state => state.images.imageSrc[player.role])
    const findImage = stance => images.find(img => img.includes(stance))
    const imageHash = {
        attack: findImage("attack"),
        die: findImage("die"),
        hurt: findImage("hurt"),
        idle: findImage("idle"),
        jump: findImage("jump"),
        run: findImage("run"),
        walk: findImage("walk")
    }

    const stepSize = 24

    const switchAction = e => {
        const map1 = map1Pos - stepSize
        const map2 = map2Pos - stepSize
        switch(e.key) {
            case "d":
            case "ArrowRight":
                setMap1Pos(map1 <= -888 ? 880 : map1)
                setMap2Pos(map2 <= -888 ? 880 : map2)
                setAction("run")
                break
            default:
                return
        }
    }

    useKeyUp(() => setAction("idle"))
    useKeyDown(e => switchAction(e))

    return (
        <div className="battle-intro" style={{backgroundColor: "lightgreen"}}>
            <div className="map-container">
                <div className="map-back1" style={{backgroundImage: `url(${map})`, transform: `translate3d(${map1Pos}px, 0, 0)`}}/>
                <div className="map-back2" style={{backgroundImage: `url(${map})`, transform: `translate3d(${map2Pos}px, 0, 0)`}}/>
            </div>
            <div className="player-container">
                <div className="image-container" style={{backgroundImage: `url(${imageHash[action]})`}}/>
            </div>
            <UserInterface/>
        </div>
    )
}

export default BattleIntro