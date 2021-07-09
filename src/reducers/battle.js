const initialState = {
    inBattle: false,
    monster: {},
    selection: null,
    display: false
}

export const battleReducer = (state = initialState, action) => {
    switch(action.type) {
        case "START_BATTLE":
            return {...state, inBattle: true, monster: action.monster}
        case "SET_MONSTER":
            return {...state, monster: action.monster}
        case "END_BATTLE":
            return{...state, inBattle: false, monster: {}}
        case "SELECT_MOVE":
            return {...state, selection: action.selection}
        case "RESET_BATTLE":
            return {...state, selection: null, inBattle: false, monster: {}}
        case "DISPLAY":
            return {...state, display: action.display}
        default:
            return state
    }
}