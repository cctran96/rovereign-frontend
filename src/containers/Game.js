import React from "react"
import Selection from "../components/Selection"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import Map from "../components/Map"

const Game = () => {
    let user = useSelector(state => state.user.user)
    let currentChar = useSelector(state => state.characters.currentCharacter)

    return (
        <div className="game-page">
            {   user ?
                <div className="game-container">
                    {   currentChar ? 
                        <Map player={currentChar}/> :
                        <Selection/>
                    }
                </div> :
                <>
                    <h1 style={{color: "white", fontSize: "50px"}}>Sorry, but you must log in to play!</h1>
                    <h2 style={{color: "white", fontSize: "40px"}}>Click
                        <NavLink style={{textDecoration: "none", color: "#470447"}} exact to="/login"> here</NavLink> to be redirected.
                    </h2>
                </>
             }
        </div>
    )
}

export default Game