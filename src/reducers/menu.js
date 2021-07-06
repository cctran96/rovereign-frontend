const initialState = {
    inventory: false,
    skills: false,
    settings: false,
    logout: false
}

export const menuReducer = (state = initialState, action) => {
    switch(action.type) {
        case "INVENTORY_MENU":
            return {...state, inventory: !state.inventory}
        case "SKILLS_MENU":
            return {...state, skills: !state.skills}
        case "SETTINGS_MENU":
            return {...state, settings: !state.settings, logout: false}
        case "LOG_MENU":
            return {...state, settings: false, logout: !state.logout}
        case "ALL_MENUS":
            return {inventory: false, skills: false, settings: false, logout: false}
        default:
            return state
    }
}