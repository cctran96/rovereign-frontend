import React from "react"
import Intro from "../maps/Intro"
import LogOutMenu from "../menus/LogOutMenu"
import SkillsMenu from "../menus/SkillsMenu"
import InventoryMenu from "../menus/InventoryMenu"

const Map = ({player}) => {
    const inTutorial = player.level === 1 && player.experience === 0
    return (
        <div className="map">
            {   inTutorial ? 
                <Intro player={player}/> :
                null
            }
            <LogOutMenu/>
            <SkillsMenu player={player}/>
            <InventoryMenu player={player}/>
        </div>
    )
}

export default Map