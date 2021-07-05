import React from "react"
import Selection from "../components/Selection"
import { useSelector } from "react-redux"
import Map from "../components/Map"

const Game = () => {
    let currentChar = useSelector(state => state.characters.currentCharacter)

    return (
        <div className="game-page">
            <div className="game-container">
                {   currentChar ? 
                    <Map player={currentChar}/> :
                    <Selection/>
                }
            </div>
        </div>
    )
}

export default Game