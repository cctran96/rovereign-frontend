import React from "react"
import { useSelector } from "react-redux"

const Items = () => {
    const items = useSelector(state => state.details.items)
    const images = useSelector(state => state.images.items.items)
    const formatName = name => name.split("_").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")
    const findImage = name => images.find(img => img.split(/[/|.]/)[3] === name)

    const listCraftingMats = string => {
        return string.split(", ").map((mat, idx) => {
            const amount = parseInt(mat)
            const string = mat.replace(/[0-9| ]/g, "")
            return (
                <div 
                key={idx} 
                style={{
                    position: "relative", 
                    backgroundImage: `url(${findImage(string)})`, 
                    width: "50px", 
                    height: "50px", 
                    backgroundSize: "cover", 
                    backgroundRepeat: "no-repeat",
                    color: "white",
                    display: "inline-block",
                    margin: "10px"
                }}>
                    <p style={{position: "absolute", top: "-17px", left: 0}}>{amount}</p>
                </div>
            )
        })
    }

    return (
        <div className="wiki-container">
            <table className="wiki-table" style={{width: "100%", maxWidth: "1500px"}}>
                <colgroup>
                <col style={{width: "15%"}}/>
                <col style={{width: "65%"}}/>
                <col style={{width: "20%"}}/>
                </colgroup>
                {   items.length ?
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Craft</th>
                        </tr>
                        {items.map((item,idx) => {
                            return (
                                <tr key={idx}>
                                    <td style={{textAlign: "center"}}>
                                        {formatName(item.name)}
                                        <img src={findImage(item.name)} alt={formatName(item.name)} style={{width: "100px", marginTop: "10px", marginLeft: "25px", marginRight: "25px"}}/>
                                    </td>
                                    <td>
                                        {item.description}
                                    </td>
                                    <td style={{textAlign: "center"}}>
                                        {   item.effect ? 
                                            listCraftingMats(item.effect.craft[0]) : null
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody> : null
                }
            </table>
        </div>
    )
}

export default Items