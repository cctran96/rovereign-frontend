import { combineReducers } from "redux"
import { loginReducer } from "./auth"
import { characterReducer } from "./characterData"
import { imageReducer } from "./imageData"
import { experienceReducer } from "./exp"
import { menuReducer } from "./menu"
import { gameDataReducer } from "./gameData"
import { monsterReducer } from "./monster"
import { battleReducer } from "./battle"
import { stanceReducer } from "./stance"

const rootReducer = combineReducers({
    user: loginReducer,
    images: imageReducer,
    characters: characterReducer,
    exp: experienceReducer,
    menu: menuReducer,
    details: gameDataReducer,
    monsters: monsterReducer,
    battle: battleReducer,
    stance: stanceReducer
})

export default rootReducer