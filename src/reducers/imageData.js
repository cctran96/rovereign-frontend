const initialState = {
    imageSrc: {},
    typeInfo: {},
}

export const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case "IMAGE_SRC":
            return {...state, imageSrc: action.imageSrc}
        case "IMAGE_INFO":
            return {...state, typeInfo: action.typeInfo}
        default:
            return state
    }
}