const initialState = {
    inventory: false,
    skills: false,
    settings: false,
    logout: false,
    chat: []
}

export const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case "INVENTORY_MENU":
            return {...state, inventory: !state.inventory, skills: false}
        case "SKILLS_MENU":
            return {...state, skills: !state.skills, inventory: false}
        case "SETTINGS_MENU":
            return {...state, settings: !state.settings, logout: false}
        case "LOG_MENU":
            return {...state, settings: false, logout: !state.logout}
        case "ALL_MENUS":
            return {...state, inventory: false, skills: false, settings: false, logout: false}
        case "CHAT":
            return {...state, chat: action.chat}
        default:
            return state
    }
}