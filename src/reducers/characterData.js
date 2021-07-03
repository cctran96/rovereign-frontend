const initialState = {
    characters: [{}, {}, {}],
    currentCharacter: {},
    deletedCharacter: {}
}

export const characterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHARACTERS":
            return {...state, characters: action.characters}
        case "SELECT_CHARACTER":
            return {...state, currentCharacter: action.currentCharacter}
        case "SET_DELETED":
            return {...state, deletedCharacter: action.character}
        default:
            return state
    }
}