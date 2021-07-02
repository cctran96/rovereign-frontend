import React from "react"
import { useSelector } from "react-redux"

const CharacterCard = ({character}) => {
    // Destructure character object
    const {id, name, gold, level, experience, stats, role} = character

    // Grab image source of character
    let image = useSelector(state => state.images.imageSrc[role])
    image = image ? image.find(img => img.includes("idle")) : null


    return (
        <div className="character-card">
            <div className="image-container" style={{backgroundImage: `url(${image})`}}>
            </div>
            <div className="stats-container">
                {
                    stats ?
                    <ul>
                        {
                            Object.keys(stats).map(key => {
                                return (
                                    <li>
                                        <b>{key}: </b>{stats[key]}
                                    </li>
                                )
                            })
                        }
                    </ul> : null
                }
            </div>
            <div className="skills-container">
                <button onClick={() => console.log((stats))}>fsfds</button>
            </div>
        </div>
    )
}

export default CharacterCard