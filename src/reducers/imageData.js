const initialState = {
    imageSrc: {},
    typeInfo: {},
    items: {}
}

export const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHARACTER_IMG":
            return {...state, imageSrc: action.imageSrc}
        case "IMAGE_INFO":
            return {...state, typeInfo: action.typeInfo}
        case "ITEM_IMG":
            return {...state, items: action.items}
        default:
            return state
    }
}