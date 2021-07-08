const initialState = {
    inBattle: false,
    monster: {},
    player: {},
    selection: null
}

export const battleReducer = (state = initialState, action) => {
    switch(action.type) {
        case "START_BATTLE":
            return {...state, inBattle: true, monster: action.monster, player: action.player}
        case "END_BATTLE":
            return{...state, inBattle: false, monster: {}, player: {}}
        case "SELECT_MOVE":
            return {...state, selection: action.selection}
        default:
            return state
    }
}