import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from "./components/Navbar"

const App = () => {
    const importImages = (r) => {
        return r.keys().map(r)
    }
    // const images = importImages(require.context('./images/minotaur/1/Attacking', true, /\.png$/)).map(i => i.default)



    return (
        <Router>
            <Navbar/>
            <Route/>
        </Router>
    )
}

export default App