import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { fetchProfile } from "./actions/accountActions"
import { imageInfo, importImages, fetchExperienceThreshold } from "./actions/gameImageActions"
import { importCharacterDetails, importSkillDetails } from "./actions/gameDataActions"
import { fetchMonsters } from "./actions/monsterActions"
import Navbar from "./components/Navbar"
import Home from "./containers/Home"
import Collection from "./containers/Collection"
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
        dispatch(fetchMonsters())
    }, [dispatch])

    return (
        <Router>
            <Navbar/>
            <Route exact path="/" render={() => <Home/>}/>
            <Route exact path="/collection" render={() => <Collection/>}/>
            <Route exact path="/play" render={() => <Game/>}/>
            <Route exact path="/login" render={() => <Login/>}/>
        </Router>
    )
}

export default App