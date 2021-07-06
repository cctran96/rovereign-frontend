import { combineReducers } from "redux"
import { loginReducer } from "./auth"
import { characterReducer } from "./characterData"
import { imageReducer } from "./imageData"
import { experienceReducer } from "./exp"
import { menuReducer } from "./menu"
import { gameDataReducer } from "./gameData"

const rootReducer = combineReducers({
    user: loginReducer,
    images: imageReducer,
    characters: characterReducer,
    exp: experienceReducer,
    menu: menuReducer,
    details: gameDataReducer
})

export default rootReducer