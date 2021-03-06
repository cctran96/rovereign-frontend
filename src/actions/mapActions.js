export const setResult = result => {
    return dispatch => {
        dispatch({ type: "RESULT", result })
    }
}

export const setCurrentMap = (map, monsters, dialogue) => {
    return dispatch => {
        dispatch({ type: "SET_MAP", map, monsters, dialogue })
    }
}

export const updateMapMonsters = monsters => {
    return dispatch => {
        dispatch({ type: "MAP_MONSTERS", monsters })
    }
}

export const updateMapDialogue = dialogue => {
    return dispatch => {
        dispatch({ type: "MAP_DIALOGUE", dialogue })
    }
}

export const updateMapDrops = drops => {
    return dispatch => {
        dispatch({ type: "MAP_DROPS", drops })
    }
}

export const updateUsedItems = items => {
    return dispatch => {
        dispatch({ type: "MAP_ITEMS", items })
    }
}

export const goBackToTown = chat => {
    return dispatch => {
        dispatch({ type: "RESET_MAP" })
        dispatch({ type: "MONSTER_STANCE", stance: "idle" })
        dispatch({ type: "PLAYER_STANCE", stance: "idle" })
        if (chat) dispatch({ type: "CHAT", chat })
    }
}