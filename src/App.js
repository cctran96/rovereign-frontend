import React, { useEffect, useState } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./containers/Home"
import Collection from "./containers/Collection"
import Game from "./containers/Game"
import Login from "./auth/Login"

const App = () => {
    // const [isLoading, setLoading] = useState(true)

    // useEffect(() => {
    //     const fakeRequest = () => new Promise(resolve => setTimeout(() => resolve(), 3500))
    //     fakeRequest().then(() => setLoading(false))
    // }, [])

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