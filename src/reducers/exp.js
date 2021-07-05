export const experienceReducer = (state = {exp: {}}, action) => {
    switch(action.type) {
        case "EXP":
            return {...state, exp: action.exp}
        default:
            return state
    }
}