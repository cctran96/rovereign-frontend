const initialState = {
    imageSrc: {},
    typeInfo: {},
    items: {},
    skills: {}
}

export const imageReducer = (state = initialState, action) => {
    switch(action.type) {
        case "CHARACTER_IMG":
            return {...state, imageSrc: action.imageSrc}
        case "IMAGE_INFO":
            return {...state, typeInfo: action.typeInfo}
        case "ITEM_IMG":
            return {...state, items: action.items}
        case "SKILL_IMG":
            return {...state, skills: action.skills}
        case "MAP_IMG":
            return {...state, maps: action.maps}
        default:
            return state
    }
}