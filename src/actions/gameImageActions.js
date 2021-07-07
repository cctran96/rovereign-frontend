export const fetchExperienceThreshold = () => {
    return dispatch => {
        fetch("http://localhost:3000/api/v1/experiences")
        .then(r => r.json()).then(exp => dispatch({ type: "EXP", exp }))
    }
}

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
            vang_satyr: findImage("vang_satyr"),
            santri_satyr: findImage("santri_satyr"),
            owr_satyr: findImage("owr_satyr"),
            pyro_wraith: findImage("pyro_wraith"),
            occult_wraith: findImage("occult_wraith"),
            arcane_wraith: findImage("arcane_wraith"),
            spearman: findImage("spearman"),
            crusader: findImage("crusader"),
            hero: findImage("hero"),
            hunter: findImage("hunter"),
            crossbowman: findImage("crossbowman"),
            robinhood: findImage("robinhood"),
            magician: findImage("magician"),
            sorcerer: findImage("sorcerer"),
            elysianist: findImage("elysianist"),
            sellers: findImage("seller")
        }
        dispatch({ type: "CHARACTER_IMG", imageSrc })

        const itemImages = importImages(require.context('../images/icons/items', false, /\.png$/)).map(i => i.default)
        const items = {
            gold: findImage("gold"),
            items: itemImages
        }
        dispatch({ type: "ITEM_IMG", items })

        const archerSkills = importImages(require.context('../images/icons/skills/archer', false, /\.png$/)).map(i => i.default)
        const wizardSkills = importImages(require.context('../images/icons/skills/wizard', false, /\.png$/)).map(i => i.default)
        const knightSkills = importImages(require.context('../images/icons/skills/knight', false, /\.png$/)).map(i => i.default)
        const skills = {archer: archerSkills, wizard: wizardSkills, knight: knightSkills}
        dispatch({ type: "SKILL_IMG", skills })

        const maps = importImages(require.context('../images/maps', false, /\.png$/)).map(i => i.default)
        dispatch({ type: "MAP_IMG", maps })
    }
}

export const imageInfo = () => {
    return dispatch => {
        dispatch({ type: "IMAGE_INFO", typeInfo})
    }
}

const knight = {
    size: "1271x811",
    attack: 10,
    die: 10,
    hurt: 10,
    idle: 10,
    jump: 10 ,
    run: 10,
    walk: 10
}

const archer = {
    size: "1311x732",
    attack: 10,
    die: 10,
    hurt: 10,
    idle: 10,
    jump: 10 ,
    run: 10,
    walk: 10
}

const wizard = {
    size: "1662x928",
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
    hunter: archer,
    crossbowman: archer,
    robinhood: archer,
    magician: wizard,
    sorcerer: wizard,
    elysianist: wizard,
    seller: {
        size: "3818x2000",
        idle: 9
    }
}