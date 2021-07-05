const itemsURL = "http://localhost:3000/api/v1/inventory_items"
const token = localStorage.getItem("jwt")

export const createItem = (player, obj, oldChars) => {
    return dispatch => {
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
            let inventory = data.inventory
            let character = {...player, inventory: inventory}
            dispatch({ type: "SELECT_CHARACTER", character })
            let characters = oldChars.map(c => c.id === player.id ? character : c)
            dispatch({ type: "SET_CHARACTERS", characters})
        })
    }
}