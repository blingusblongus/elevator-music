const GAME = {
    tick: {
        rate: 160,
        duration: 1000,
    },
    practiceFatigue: 30,
    busk: {
        successRate: .8,
        renownMult: .5,
        techniquePow: .5,
    },
    practice: {
        mod: 1,
    },
    techDecay: {
        floor: .75,
        rate: .001,
        after: 60 * 1000,
    }
}

export default GAME;