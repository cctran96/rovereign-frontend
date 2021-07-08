export const toggleInventoryMenu = () => {
    return dispatch => {
        dispatch({ type: "INVENTORY_MENU" })
    }
}

export const toggleSkillsMenu = () => {
    return dispatch => {
        dispatch({ type: "SKILLS_MENU" })
    }
}

export const toggleSettingsMenu = () => {
    return dispatch => {
        dispatch({ type: "SETTINGS_MENU" })
    }
}

export const toggleLogMenu = () => {
    return dispatch => {
        dispatch({ type: "LOG_MENU" })
    }
}

export const toggleAllMenus = () => {
    return dispatch => {
        dispatch({ type: "ALL_MENU" })
    }
}

export const updateChatBox = chat => {
    return dispatch => {
        dispatch({ type: "CHAT", chat})
    }
}