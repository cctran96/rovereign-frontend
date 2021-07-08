const initialState = {
    monsters: []
}

export const monsterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "MONSTERS":
            return {...state, monsters: action.monsters}
        default:
            return state
    }
}