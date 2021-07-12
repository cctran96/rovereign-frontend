import React from "react"
import { NavLink } from "react-router-dom"

const WikiNav = () => {
    return (
        <div className="wiki-nav">
            <NavLink activeStyle={activeStyle} exact to="/wiki/items">Items</NavLink>
            <NavLink activeStyle={activeStyle} exact to="/wiki/monsters">Monsters</NavLink>
            <NavLink activeStyle={activeStyle} exact to="/wiki/characters">Characters</NavLink>
        </div>
    )
}

export default WikiNav

const activeStyle = {
    fontWeight: "bold",
    color: "#add8e6",
    fontSize: "30px"
}