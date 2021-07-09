const initialState = {
    characters: [],
    skills: {},
    items: {}
}

export const gameDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHARACTER_DATA":
            return {...state, characters: action.characters}
        case "SKILL_DATA":
            return {...state, skills: action.skills}
        case "ITEM_DATA":
            return {...state, items: action.items}
        default:
            return state
    }
}