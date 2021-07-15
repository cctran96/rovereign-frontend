import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectMove } from "../actions/battleActions"

const SkillsMenu = ({player}) => {
    const dispatch = useDispatch()
    const show = useSelector(state => state.menu.skills)
    const images = useSelector(state => state.images.skills[skillHash[player.role]])
    const inBattle = useSelector(state => state.battle.inBattle)
    const display = useSelector(state => state.battle.display)
    const skills = useSelector(state => state.details.skills.filter(s => s.character === hash[player.role] && player.level >= s.level))

    const [hoveredSkill, setHoveredSkill] = useState(null)
   
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
        const mpCheck = skill.effect.mp <= player.stats.current_mp
        if (inBattle && !display && mpCheck) dispatch(selectMove({skill: skill.name}))
        if (!mpCheck) dispatch(selectMove({error: "NOT ENOUGH MANA"}))
    }
    
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")

    const handleHover = e => {
        const skill = e.target.parentNode.getAttribute("skill")
        if (skill) setHoveredSkill(skill)
    }

    useEffect(() => {
        if (!show) setHoveredSkill(false)
    }, [show])

    return (
        show ?
        <div className="skills-menu">
            {skillset().map((skill, idx) => {
                return (
                    <div 
                    key={idx} 
                    style={{position: "relative", width: "50px", height: "50px"}} 
                    onMouseEnter={handleHover}
                    onMouseLeave={() => setHoveredSkill(null)}
                    skill={skill.name}
                    >
                        <div className="skill-icon" style={{backgroundImage: `url(${skillImage(skill)})`}} onClick={() => handleClick(skill)}/>
                        <div 
                            style={{
                                width: "100%", 
                                height: "100%", 
                                position: "absolute", 
                                top: 0, 
                                left: 0, 
                                zIndex: 1,
                                display: !skill.effect || skill.effect.mp > player.stats.current_mp ? "block" : "none"
                            }}
                        />
                        {   skills.find(s => s.name === skill.name) ?
                            <div className="tool-tip" style={{display: hoveredSkill === skill.name ? "block" : "none"}}>
                                <p>{formatName(skill.name)}</p>
                                <div className="skill-icon" style={{marginTop: "10px", marginLeft: "75px",backgroundImage: `url(${skillImage(skill)})`}}/>
                                <p>Requires {skill.effect.mp} MP</p>
                                <p>{skills.find(s => s.name === skill.name).description}</p>
                            </div> : null
                        }
                    </div>
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
    sorcerer: "wizard",
    elysianist: "wizard",
    hunter: "archer",
    crossbowman: "archer",
    robinhood: "archer"
}

const hash = {
    spearman: "spearman",
    crusader: "spearman",
    hero: "spearman",
    magician: "magician",
    sorcerer: "magician",
    elysianist: "magician",
    hunter: "hunter",
    crossbowman: "hunter",
    robinhood: "hunter"
}