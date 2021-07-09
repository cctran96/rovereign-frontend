const initialState = {
    player: "idle",
    monster: "idle"
}

export const stanceReducer = (state = initialState, action) => {
    switch(action.type) {
        case "PLAYER_STANCE":
            return {...state, player: action.stance}
        case "MONSTER_STANCE":
            return {...state, monster: action.stance}
        default:
            return state
    }
}