import React, { useState } from "react"
import { useSelector } from "react-redux"

const Wiki = () => {
    const [action, setAction] = useState("idle")
    const images = useSelector(state => state.images.imageSrc.hero)

    const changeImage = e => {
        setAction(e.target.innerText)
        setTimeout(() => setAction("idle"), 1000)
    }

    return (
        <div className="wiki-page" style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={images.find(i => i.includes(action))} style={{height: "350px", width: "520px"}}/>
            <button onClick={changeImage}>attack</button>
            <button onClick={changeImage}>hurt</button>
            <button onClick={changeImage}>die</button>
            <button onClick={changeImage}>walk</button>
            <button onClick={changeImage}>taunt</button>
        </div>
    )
}

export default Wiki