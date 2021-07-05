import React from "react"
import Intro from "../maps/Intro"

const Map = ({player}) => {
    const inTutorial = player.level === 1 && player.experience === 0

    return (
        <div className="map">
            {   !inTutorial ? 
                <Intro player={player}/> :
                null
            }
        </div>
    )
}

export default Map