import React from "react"
import WikiNav from "../components/WikiNav"
import { Route } from "react-router-dom"
import Characters from "./Characters"
import Monsters from "./Monsters"
import Items from "./Items"
import WikiHome from "./WikiHome"

const Wiki = () => {
    return (
        <div className="wiki-page">
            <WikiNav/>
            <Route exact path="/wiki" render={() => <WikiHome/>}/>
            <Route exact path="/wiki/items" render={() => <Items/>}/>
            <Route exact path="/wiki/monsters" render={() => <Monsters/>}/>
            <Route exact path="/wiki/characters" render={() => <Characters/>}/>
        </div>
    )
}

export default Wiki