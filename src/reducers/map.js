const initialState = {
    victory: false,
    monsters: [],
    map: "amazen",
    dialogue: [],
    drops: [],
}

export const mapReducer = (state = initialState, action) => {
    switch(action.type) {
        case "VICTORY":
            return {...state, victory: action.victory}
        case "MAP_MONSTERS":
            return {...state, monsters: action.monsters}
        case "MAP":
            return {...state, map: action.map}
        case "MAP_DIALOGUE":
            return {...state, dialogue: action.dialogue}
        case "MAP_DROPS":
            return {...state, drops: action.drops}
        case "SET_MAP":
            return {...state, map, monsters, dialogue}
        case "RESET_MAP":
            return {...state, map: "amazen", monsters: [], dialogue: [], drops: [], victory: false}
        default:
            return state
    }
}