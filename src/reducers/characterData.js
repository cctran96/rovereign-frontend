const initialState = {
    characters: [{}, {}, {}],
    currentCharacter: null,
    deletedCharacter: {},
    errors: null
}

export const characterReducer = (state = initialState, action) => {
    switch(action.type) {
        case "SET_CHARACTERS":
            return {...state, characters: action.characters, errors: null}
        case "SELECT_CHARACTER":
            return {...state, currentCharacter: action.character}
        case "SET_DELETED":
            return {...state, deletedCharacter: action.character}
        case "NAME_ERROR":
            return {...state, errors: action.errors}
        default:
            return state
    }
}