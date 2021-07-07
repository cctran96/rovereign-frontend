import React from "react"
import { useSelector } from "react-redux"

const SkillsMenu = ({player}) => {
    const show = useSelector(state => state.menu.skills)
    const images = useSelector(state => state.images.skills[skillHash[player.role]])
    const skills = useSelector(state => state.details.skills.filter(s => s.character === player.role && player.level >= s.level))
   
    const skillset = () => {
        let placeholder = [...skills]
        while (placeholder.length < 15) {
            placeholder.push({})
        }
        return placeholder
    }

    const skillImage = skill => {
        const image = images.find(img => img.includes(skill.name))
        return image ? image : null
    }

    return (
        show ?
        <div className="skills-menu">
            {skillset().map((skill, idx) => {
                return (
                    <div key={idx} className="skill-icon" style={{backgroundImage: `url(${skillImage(skill)})`}}/>
                )
            })}
        </div> : null
    )
}

export default SkillsMenu

const skillHash = {
    spearman: "knight",
    crusader: "knight",
    hero: "knight",
    magician: "wizard",
    sorceror: "wizard",
    elysianist: "wizard",
    hunter: "archer",
    crossbowman: "archer",
    robinhood: "archer"
}