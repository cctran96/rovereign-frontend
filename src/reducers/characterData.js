const initialState = {
    characters: [{}, {}, {}],
    currentCharacter: {},
}

export const characterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHARACTERS":
            return {...state, characters: action.characters}
        case "SELECT_CHARACTER":
            return {...state, currentCharacter: action.currentCharacter}
        default:
            return state
    }
}