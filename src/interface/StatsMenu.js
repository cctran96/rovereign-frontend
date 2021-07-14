import React from "react"
import { useSelector } from "react-redux"
import { FaFistRaised, FaHatWizard, FaRunning, FaBullseye } from "react-icons/fa/index.esm"
import { GiPocketBow, GiCheckedShield } from "react-icons/gi/index.esm"

const StatsMenu = ({player}) => {
    const show = useSelector(state => state.menu.stats)
    const stats = player.stats
    const combatStats = Object.keys(stats).filter(stat => !stat.includes("hp") && !stat.includes("mp"))

    const icon = stat => {
        switch(stat){
            case "str":
                return <FaFistRaised size={30} color="#C68642"/>
            case "int":
                return <FaHatWizard size={30} color="#0096FF"/>
            case "dex":
                return <GiPocketBow size={30} color="#A0522D"/>
            case "spd":
                return <FaRunning size={30} color="black"/>
            case "def":
                return <GiCheckedShield size={30} color="gray"/>
            case "cri":
                return <FaBullseye size={30} color="#800000"/>
            default:
                return
        }
    }

    return (
        show ? 
        <div className="stats-menu">
            <h1>STATS</h1>
            <div className="ui-stats">
                {
                    combatStats.map((stat, idx) => {
                        return (
                            <div key={idx} className="ui-stat">
                                {icon(stat)}
                                <b>{stat.toUpperCase()}:</b>
                                <p>{stats[stat]}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div> : null
    )
}

export default StatsMenu

