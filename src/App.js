import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { fetchProfile } from "./actions/accountActions"
import { imageInfo, importImages, fetchExperienceThreshold } from "./actions/gameImageActions"
import { importCharacterDetails, importSkillDetails, importItemDetails } from "./actions/gameDataActions"
import { fetchMonsters } from "./actions/monsterActions"
import Navbar from "./components/Navbar"
import Home from "./containers/Home"
import Wiki from "./containers/Wiki"
import Game from "./containers/Game"
import Login from "./auth/Login"

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProfile())
        dispatch(importImages())
        dispatch(imageInfo())
        dispatch(fetchExperienceThreshold())
        dispatch(importCharacterDetails())
        dispatch(importSkillDetails())
        dispatch(importItemDetails())
        dispatch(fetchMonsters())
    }, [dispatch])

    return (
        <Router>
            <Navbar/>
            <Route exact path="/" render={() => <Home/>}/>
            <Route exact path="/wiki" render={() => <Wiki/>}/>
            <Route exact path="/play" render={() => <Game/>}/>
            <Route exact path="/login" render={() => <Login/>}/>
        </Router>
    )
}

export default App