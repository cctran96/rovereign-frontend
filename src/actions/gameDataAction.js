export const importImages = () => {
    const importImages = (r) => {
        return r.keys().map(r)
    }
    const images = importImages(require.context('../images/', true, /\.png$/)).map(i => i.default)
    return dispatch => {
        const findImage = name => images.filter(i => i.includes(name))
        const imageSrc = {
            marmoreal_minotaur: findImage("marmoreal_minotaur"),
            maro_minotaur: findImage("maro_minotaur"),
            griza_minotaur: findImage("griza_minotaur"),
            stone_golem: findImage("stone_golem"),
            jade_golem: findImage("jade_golem"),
            gidgee_golem: findImage("gidgee_golem"),
            spearman: findImage("spearman"),
            crusader: findImage("crusader"),
            hero: findImage("hero"),
            vang_satyr: findImage("vang_satyr"),
            santri_satyr: findImage("santri_satyr"),
            owr_satyr: findImage("owr_satyr"),
            elysian_wraith: findImage("elysian_wraith"),
            occult_wraith: findImage("occult_wraith"),
            arcane_wraith: findImage("arcane_wraith"),
            sellers: findImage("seller")
        }
        dispatch({ type: "IMAGE_SRC", imageSrc })
    }
}

export const imageInfo = () => {
    return dispatch => {
        dispatch({ type: "IMAGE_INFO", typeInfo})
    }
}

const knight = {
    size: "1065x799",
    attack: 10,
    die: 10,
    hurt: 10,
    idle: 10,
    jump: 10 ,
    run: 10,
    walk: 10
}

const typeInfo = {
    minotaur: {
        size: "720x490",
        attack: 12,
        die: 15,
        hurt: 12,
        idle: 12,
        taunt: 18,
        walk: 18
    },
    golem: {
        size: "720x480",
        attack: 12,
        die: 15,
        hurt: 12,
        idle: 12,
        taunt: 18,
        walk: 18
    },
    satyr: {
        size: "520x420",
        attack: 12,
        die: 15,
        hurt: 12,
        idle: 12,
        taunt: 18,
        walk: 18
    },
    wraith: {
        size: "520x420",
        attack: 12,
        cast: 18,
        die: 15,
        hurt: 12,
        idle: 12,
        taunt: 18,
        walk: 12
    },
    spearman: knight,
    crusader: knight,
    hero: knight,
    seller: {
        size: "3818x2000",
        idle: 9
    }
}