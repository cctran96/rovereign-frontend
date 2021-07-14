const initialState = {
    inventory: false,
    skills: false,
    stats: false,
    logout: false,
    chat: []
}

export const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case "INVENTORY_MENU":
            return {...state, inventory: !state.inventory, skills: false, stats: false}
        case "SKILLS_MENU":
            return {...state, skills: !state.skills, inventory: false, stats: false}
        case "STATS_MENU":
            return {...state, stats: !state.stats, skills: false, inventory: false}
        case "LOG_MENU":
            return {...state, logout: !state.logout}
        case "ALL_MENUS":
            return {...state, inventory: false, skills: false, stats: false, logout: false}
        case "CHAT":
            return {...state, chat: action.chat}
        default:
            return state
    }
}