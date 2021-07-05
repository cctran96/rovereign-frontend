import { combineReducers } from "redux"
import { loginReducer } from "./auth"
import { characterReducer } from "./characterData"
import { imageReducer } from "./imageData"
import { experienceReducer } from "./exp"

const rootReducer = combineReducers({
    user: loginReducer,
    images: imageReducer,
    characters: characterReducer,
    exp: experienceReducer
})

export default rootReducer