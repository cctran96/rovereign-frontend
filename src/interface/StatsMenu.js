import React from "react"
import { useSelector } from "react-redux"

const StatsMenu = () => {
    const show = useSelector(state => state.menu.stats)

    return (
        <div className="stats-menu">
            
        </div>
    )
}

export default StatsMenu

