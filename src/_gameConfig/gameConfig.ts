const GAME = {
    tick: {
        rate: 160,
        duration: 1000,
    },
    practiceFatigue: 40,
    busk: {
        successRate: .8,
        multiplier: .05,
        renown: .0005,
    },
    practice: {
        mod: 1,
    },
    techDecay: {
        floor: .75,
        rate: .001,
        after: 3 * 60 * 1000,
    }
}

export default GAME;