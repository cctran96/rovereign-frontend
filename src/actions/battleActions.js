export const startBattle = (monster) => {
    return dispatch => {
        dispatch({ type: "START_BATTLE", inBattle: true, monster })
    }
}

export const endBattle = () => {
    return dispatch => {
        dispatch({ type: "END_BATTLE" })
    }
}

export const selectMove = selection => {
    return dispatch => {
        dispatch({ type: "SELECT_MOVE", selection })
    }
}

export const setCurrentMonster = monster => {
    return dispatch => {
        dispatch({ type: "SET_MONSTER", monster })
    }
}

export const resetBattle = () => {
    return dispatch => {
        dispatch({ type: "RESET_BATTLE" })
    }
}

export const changeDisplay = display => {
    return dispatch => {
        dispatch({ type: "DISPLAY", display })
    }
}