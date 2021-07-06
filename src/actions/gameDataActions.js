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