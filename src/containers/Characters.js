import React from "react"
import { useSelector } from "react-redux"

const Characters = () => {
    const images = useSelector(state => state.images.imageSrc)
    const findImage = name => images[name].find(img => img.includes("idle"))

    return (
        <div className="wiki-container">
            <div className="wiki-class-container">
                {   Object.keys(images).length ?
                    <>
                        <div className="class-container">
                            <h1>Knight</h1>
                            <div className="wiki-characters-container">
                                {   
                                    knights.map((role, idx) => {
                                        return (
                                            <div key={idx} className="wiki-character">
                                                <p style={{left: "35%"}}>{role[0].toUpperCase() + role.slice(1)}</p>
                                                <div className="wiki-char" style={{backgroundImage: `url(${findImage(role)})`}}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="class-container">
                            <h1>Wizard</h1>
                            <div className="wiki-characters-container">
                                {   
                                    wizards.map((role, idx) => {
                                        return (
                                            <div key={idx} className="wiki-character">
                                                <p>{role[0].toUpperCase() + role.slice(1)}</p>
                                                <div className="wiki-char" style={{backgroundImage: `url(${findImage(role)})`}}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="class-container">
                            <h1>Archer</h1>
                            <div className="wiki-characters-container">
                                {
                                        archers.map((role, idx) => {
                                        return (
                                            <div key={idx} className="wiki-character">
                                                <p>{role[0].toUpperCase() + role.slice(1)}</p>
                                                <div className="wiki-char" style={{backgroundImage: `url(${findImage(role)})`}}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </> : null
                }
            </div>
        </div>
    )
}

export default Characters

const knights = ["spearman", "crusader", "hero"]
const wizards = ["magician", "sorcerer", "elysianist"]
const archers = ["hunter", "crossbowman", "robinhood"]