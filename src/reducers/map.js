const initialState = {
    result: false,
    monsters: [],
    map: "amazen",
    dialogue: [],
    drops: [],
    items: {}
}

export const mapReducer = (state = initialState, action) => {
    switch(action.type) {
        case "RESULT":
            return {...state, result: action.result}
        case "MAP_MONSTERS":
            return {...state, monsters: action.monsters}
        case "MAP":
            return {...state, map: action.map}
        case "MAP_DIALOGUE":
            return {...state, dialogue: action.dialogue}
        case "MAP_DROPS":
            return {...state, drops: action.drops}
        case "MAP_ITEMS":
            return {...state, items: action.items}
        case "SET_MAP":
            return {...state, map: action.map, monsters: action.monsters, dialogue: action.dialogue}
        case "RESET_MAP":
            return {...state, map: "amazen", monsters: [], dialogue: [], drops: [], items: [], result: false}
        default:
            return state
    }
}