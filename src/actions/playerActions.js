const itemsURL = "http://localhost:3000/api/v1/inventory_items"
const characterURL = "http://localhost:3000/api/v1/user_characters/"
const upgradeURL = "http://localhost:3000/api/v1/upgrade/"
const token = localStorage.getItem("jwt")

export const updateInventory = (currentPlayer, obj, oldChars) => {
    return dispatch => {
        const player = oldChars.find(c => c.id === currentPlayer.id)
        const body = () => {
            let items = {...obj}
            Object.keys(items).forEach(key => {
                let item = player.inventory.find(i => i.item.name === key)
                item ? items = {...items, [key]: item.amount + items[key]} : console.log()
            })
            return {id: player.id, items: items}
        }
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body())
        }
        fetch(itemsURL, config)
        .then(r => r.json()).then(data => {
            let inventory = [...player.inventory]
            let updates = data.inventory
            updates.forEach(item => {
                let found = inventory.find(i => i.item === item.item)
                found ? found.amount = item.amount : inventory.push(item)
            })
            let character = {...player, inventory: inventory}
            let characters = oldChars.map(c => c.id === player.id ? character : c)
            dispatch({ type: "SELECT_CHARACTER", character })
            dispatch({ type: "SET_CHARACTERS", characters})
        })
    }
}

export const updateCharacter = (currentPlayer, obj, oldChars, stats) => {
    return dispatch => {
        let character = oldChars.find(c => c.id === currentPlayer.id)
        const body = () => {
            let update = {...obj}
            Object.keys(update).forEach(key => {
                key === "character" ? console.log() :
                update = {...update, [key]: character[key] + update[key]}
            })
            if (stats) update.stats = stats
            return update
        }
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body())
        }
        fetch(characterURL + character.id, config)
        .then(r => r.json()).then(data => {
            const updates = data.updates
            Object.keys(updates).forEach(key => character = {...character, [key]: updates[key]})
            let characters = oldChars.map(c => c.id === character.id ? character : c)
            dispatch({ type: "SET_CHARACTERS", characters})
            dispatch({ type: "SELECT_CHARACTER", character })
        })
    }
}

export const updateCharAndInventory = (currentPlayer, charObj, invObj, oldChars, stats) => {
    return dispatch => {
        let character = oldChars.find(c => c.id === currentPlayer.id)

        // config for updating character
        const charBody = () => {
            let update = {...charObj}
            Object.keys(update).forEach(key => {
                key === "character" ? console.log() :
                update = {...update, [key]: character[key] + update[key]}
            })
            if (stats) update.stats = stats
            return update
        }
        const charConfig = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(charBody())
        }

        // config for updating inventory
        const invBody = () => {
            let items = {...invObj}
            Object.keys(items).forEach(key => {
                let item = character.inventory.find(i => i.item.name === key)
                item ? items = {...items, [key]: item.amount + items[key]} : console.log()
            })
            return {id: character.id, items: items}
        }
        const invConfig = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(invBody())
        }

        fetch(characterURL + character.id, charConfig)
        .then(r => r.json()).then(data => {
            const updates = data.updates
            Object.keys(updates).forEach(key => character = {...character, [key]: updates[key]})
            fetch(itemsURL, invConfig)
            .then(r => r.json()).then(data => {
                let inventory = [...character.inventory]
                let updates = data.inventory
                updates.forEach(item => {
                    let found = inventory.find(i => i.item === item.item)
                    console.log(found)
                    found ? found.amount = item.amount : inventory.push(item)
                })
                character = {...character, inventory: inventory}
                let characters = oldChars.map(c => c.id === character.id ? character : c)
                dispatch({ type: "SELECT_CHARACTER", character })
                dispatch({ type: "SET_CHARACTERS", characters})
            })
        }).catch(console.log())
    }
}

export const upgradeCharacter = (obj, oldChars) => {
    return dispatch => {
        let player = oldChars.find(c => c.id === obj.id)
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(obj)
        }
        fetch(upgradeURL, config)
        .then(r => r.json()).then(data => {
            let character = {...player, role: data.role, stats: data.stats, gold: data.gold}
            let characters = oldChars.map(c => c.id === player.id ? character : c)
            dispatch({ type: "SELECT_CHARACTER", character })
            dispatch({ type: "SET_CHARACTERS", characters})
        })
    }
}