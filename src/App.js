import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { fetchProfile } from "./actions/accountActions"
import Navbar from "./components/Navbar"
import Home from "./containers/Home"
import Collection from "./containers/Collection"
import Game from "./containers/Game"
import Login from "./auth/Login"

const App = () => {
    const dispatch = useDispatch()
    // const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchProfile())
    }, [])    

    const importImages = (r) => {
        return r.keys().map(r)
    }
    // const images = importImages(require.context('./images/minotaur/1/Attacking', true, /\.png$/)).map(i => i.default)



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