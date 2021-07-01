const initialState = {
    user: false,
    requesting: false,
    errors: false
}


export const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case "START_REQUEST":
            return {...state, requesting: true}
        case "LOGIN":
            return {...state, user: action.user, errors: false, requesting: false}
        case "ERROR":
            return {...state, errors: action.errors, requesting: false}
        default:
            return state
    }
}