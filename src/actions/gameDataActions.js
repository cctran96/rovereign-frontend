export const importSkillDetails = () => {
    return dispatch => {
        fetch("http://localhost:3000/api/v1/skills")
        .then(r => r.json()).then(data => {
            const skills = data.skills
            dispatch({ type: "SKILL_DATA", skills })
        })
    }
}

export const importCharacterDetails = () => {
    return dispatch => {
        fetch("http://localhost:3000/api/v1/characters")
        .then(r => r.json()).then(data => {
            const characters = data.characters
            dispatch({ type: "CHARACTER_DATA", characters })
        })
    }
}

export const importItemDetails = () => {
    return dispatch => {
        fetch("http://localhost:3000/api/v1/items")
        .then(r => r.json()).then(data => {
            const items = data.items
            dispatch({ type: "ITEM_DATA", items })
        })
    }
}