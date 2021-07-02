import React from "react"
import CharacterCard from "./CharacterCard"
import { useSelector, useDispatch } from "react-redux"

const Selection = () => {
    const characters = useSelector(state => state.characters.characters)
    // const characters = useSelector(state => state.user.user.user_characters)
    const dispatch = useDispatch()

    return (
        <div className="selection-container">
            { characters.map((character, idx) => <CharacterCard key={idx} character={character}/>) }
        </div>
    )
}

export default Selection