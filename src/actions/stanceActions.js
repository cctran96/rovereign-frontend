export const changePlayerStance = stance => {
    return dispatch => {
        dispatch({ type: "PLAYER_STANCE", stance })
    }
}

export const changeMonsterStance = stance => {
    return dispatch => {
        dispatch({ type: "MONSTER_STANCE", stance })
    }
}