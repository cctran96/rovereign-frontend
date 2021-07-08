import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMove } from "../actions/battleActions"

const SkillsMenu = ({player}) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.menu.skills)
    const images = useSelector(state => state.images.skills[skillHash[player.role]])
    const inBattle = useSelector(state => state.battle.inBattle)
    const skills = useSelector(state => state.details.skills.filter(s => s.character.role === player.role && player.level >= s.level))
   
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

    const handleClick = skill => {
        if (inBattle) dispatch(selectMove({skill: skill}))
    }

    const formattedName = skill => {
        return skill.name
    }

    return (
        show ?
        <div className="skills-menu">
            {skillset().map((skill, idx) => {
                return (
                    <div 
                        key={idx} 
                        className="skill-icon" 
                        style={{backgroundImage: `url(${skillImage(skill)})`}}
                        onClick={() => handleClick(formattedName(skill))}
                    />
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