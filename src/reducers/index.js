import { combineReducers } from "redux"
import { loginReducer } from "./auth"
import { characterReducer } from "./characterData"
import { imageReducer } from "./imageData"

const rootReducer = combineReducers({
    user: loginReducer,
    images: imageReducer,
    characters: characterReducer
})

export default rootReducer