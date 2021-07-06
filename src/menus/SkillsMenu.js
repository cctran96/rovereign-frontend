import React from "react"
import { motion } from "framer-motion"
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
        <motion.div className="skills-menu" variants={menuVar} animate={show ? "open" : "closed"}>
            {   show ?
                <>
                    {skillset().map(skill => {
                        return (
                            <div className="skill-icon" style={{backgroundImage: `url(${skillImage(skill)})`}}/>
                        )
                    })}
                </> : null
            }
        </motion.div>
    )
}

export default SkillsMenu

const menuVar = {
    open: {opacity: 1, transition: {duration: 0.7, ease: "easeInOut"}},
    closed: {opacity: 0}
}

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