export const setVictory = victory => {
    return dispatch => {
        dispatch({ type: "VICTORY", victory })
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

export const goBackToTown = () => {
    return dispatch => {
        dispatch({ type: "RESET_MAP" })
        dispatch({ type: "MONSTER_STANCE", stance: "idle" })
    }
}