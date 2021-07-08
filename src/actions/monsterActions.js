const monsterURL = "http://localhost:3000/api/v1/monsters"

export const fetchMonsters = () => {
    return dispatch => {
        fetch(monsterURL)
        .then(r => r.json()).then(data => {
            const monsters = data.monsters
            dispatch({ type: "MONSTERS", monsters })
        })
    }
}