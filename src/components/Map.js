import React from "react"
import { useSelector } from "react-redux"
import Intro from "../maps/Intro"
import BattleIntro from "../maps/BattleIntro"
import LogOutMenu from "../interface/LogOutMenu"
import SkillsMenu from "../interface/SkillsMenu"
import InventoryMenu from "../interface/InventoryMenu"
import UserInterface from "../interface/UserInterface"
import Shop from "../maps/Shop"

const Map = ({player}) => {
    const actual = useSelector(state => state.characters.characters.find(c => c.id === player.id))
    const inTutorial = actual.level === 1 && actual.gold === 0 && actual.inventory.length === 0
    const inBattleTutorial = actual.level === 1 && actual.experience === 0

    const map = useSelector(state => state.map.map)
    
    return (
        <div className="map">
            {   inTutorial ? 
                <Intro player={player}/> :
                (inBattleTutorial ? 
                    <BattleIntro player={player}/> :
                    (   map === "amazen" ?
                        <Shop /> :
                        null
                    )
                )
            }
            <UserInterface/>
            <LogOutMenu/>
            <SkillsMenu player={player}/>
            <InventoryMenu player={player}/>
        </div>
    )
}

export default Map