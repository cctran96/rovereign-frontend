import React from "react"
import { useSelector } from "react-redux"

const Monsters = () => {
    const images = useSelector(state => state.images.imageSrc)
    const findImage = name => images[name].find(img => img.includes("idle"))
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")

    return (
        <div className="wiki-container">
            <div className="wiki-class-container">
                {   Object.keys(images).length ?
                    <>
                        {
                            Object.keys(monsters).map((key, idx) => {
                                return (
                                    <div key={idx} className="class-container">
                                        <h1>{key[0].toUpperCase() + key.slice(1)}</h1>
                                        <div className="wiki-characters-container">
                                            {
                                                monsters[key].map((monster, idx) => {
                                                    return (
                                                        <div key={idx} className="wiki-character">
                                                            <p style={{left: "35%"}}>{formatName(monster)}</p>
                                                            <div className="wiki-mon" style={{backgroundImage: `url(${findImage(monster)})`}}/>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </> : null
                }
            </div>
        </div>
    )
}

export default Monsters

const monsters = {
    satyr: ["vang_satyr", "owr_satyr", "santri_satyr"],
    minotaur: ["maro_minotaur", "griza_minotaur", "marmoreal_minotaur"],
    golem: ["gidgee_golem", "stone_golem", "jade_golem"],
    wraith: ["arcane_wraith", "occult_wraith", "pyro_wraith"]   
}