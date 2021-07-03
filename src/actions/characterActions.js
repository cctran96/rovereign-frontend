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
        const token = localStorage.getItem("jwt")
        const config = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        fetch(`http://localhost:3000/api/v1/user_characters/${id}`, config)
        .then(r => r.json()).then(data => {
            const characters = allCharacters.map(c => c.id === id ? {} : c)
            console.log(data)
            dispatch({ type: "SET_CHARACTERS", characters })
            callback()
        })
    }
}