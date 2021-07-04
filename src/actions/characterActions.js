const token = localStorage.getItem("jwt")
const characterURL = "http://localhost:3000/api/v1/user_characters/"

export const setCurrentCharacter = () => {
    return dispatch => {
        const currentCharacter = null
        dispatch({ type: "SELECT_CHARACTER", currentCharacter })
    }
}

export const setDeletedCharacter = character => {
    return dispatch => {
        dispatch({ type: "SET_DELETED", character })
    }
}

export const confirmDeleteCharacter = (id, allCharacters, callback) => {
    return dispatch => {
        const config = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        fetch(characterURL + id, config)
        .then(r => r.json()).then(data => {
            const characters = allCharacters.map(c => c.id === id ? {} : c)
            console.log(data)
            dispatch({ type: "SET_CHARACTERS", characters })
            callback()
        })
    }
}

export const createCharacter = (user_id, name, role, oldChars, callback) => {
    return dispatch => {
        const body = {
            user_id,
            name,
            gold: 1000,
            level: 1,
            experience: 0,
            role
        }
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
        fetch(characterURL, config)
        .then(r => r.json()).then(data => {
            if (data.errors) {
                let errors = []
                data.errors.name.forEach(e => errors.push(`Name ${e}`))
                errors = errors.map(e => e.includes("short") ? "Name is too short" : e)
                dispatch({ type: "NAME_ERROR", errors })
            } else {
                const idx = oldChars.findIndex(o => !Object.keys(o).length)
                let characters = [...oldChars]
                characters[idx] = data.character
                dispatch({ type: "SET_CHARACTERS", characters })
                callback()
            }
        })
    }
}