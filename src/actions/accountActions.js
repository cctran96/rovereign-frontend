const usersURL = "http://localhost:3000/api/v1/users"
const loginURL = "http://localhost:3000/api/v1/login"

export const fetchLogin = (body, history) => {
    return dispatch => {
        const config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        dispatch({type: "START_REQUEST"})
        fetch(loginURL, config)
        .then(r => r.json()).then(data => {
            if (data.errors) {
                const errors = [{both: data.errors}]
                dispatch({ type: "ERROR", errors })
            } else {
                const user = (({id, username, bio}) => ({id, username, bio}))(data.user)
                const characters = ((({user_characters}) => ({user_characters}))(data.user)).user_characters
                while (characters.length < 3) {
                    characters.push({})
                }
                dispatch({ type: "LOGIN", user })
                dispatch({ type: "SET_CHARACTERS", characters })
                localStorage.setItem("jwt", data.jwt)
                history.replace("/")
            }
        })
    }
}

export const fetchProfile = () => {
    return dispatch => {
        const token = localStorage.getItem("jwt")
        if (token) {
            fetch(loginURL, {
                method: "GET", 
                headers: {
                    "Content-Type": "appliction/json",
                    "Authorization": `Bearer ${token}`
                }
            }).then(r => r.json()).then(data => {
                if (data.message || data.error) {
                    localStorage.removeItem("jwt")
                } else {
                    const user = (({id, username, bio}) => ({id, username, bio}))(data.user)
                    const characters = ((({user_characters}) => ({user_characters}))(data.user)).user_characters
                    while (characters.length < 3) {
                        characters.push({})
                    }
                    dispatch({ type: "LOGIN", user })
                    dispatch({ type: "SET_CHARACTERS", characters })
                }
            })
        }
    }
}

export const fetchSignup = (body, history) => {
    return dispatch => {
        const config = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        }
        fetch(usersURL, config)
        .then(r => r.json()).then(data => {
            if (data.errors || body.password !== body.confirm) {
                const errors = []
                for (const [key, value] of Object.entries(data.errors)) {
                    errors.push({[key]: `${key[0].toUpperCase() + key.slice(1)} ${value}`})
                }
                if (body.password !== body.confirm) errors.push({confirm: "Password does not match"})
                console.log(errors)
                dispatch({ type: "ERROR", errors })
            } else {
                const user = (({id, username, bio}) => ({id, username, bio}))(data.user)
                const characters = ((({user_characters}) => ({user_characters}))(data.user)).user_characters
                while (characters.length < 3) {
                    characters.push({})
                }
                dispatch({ type: "LOGIN", user })
                dispatch({ type: "SET_CHARACTERS", characters })
                localStorage.setItem("jwt", data.jwt)
                history.replace("/")
            }
        })
    }
}