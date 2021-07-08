export const startBattle = (monster, player) => {
    return dispatch => {
        dispatch({ type: "START_BATTLE", inBattle: true, monster, player })
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