const initialState = {
    characters: [],
    skills: {}
}

export const gameDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHARACTER_DATA":
            return {...state, characters: action.characters}
        case "SKILL_DATA":
            return {...state, skills: action.skills}
        default:
            return state
    }
}