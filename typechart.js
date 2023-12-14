const typeChart = {
    fire: {
        fire: getRandomMultiplier(0.3, 0.5),
        water: getRandomMultiplier(0.5, 0.7),
        grass: getRandomMultiplier(1.3, 1.6),
        electric: getRandomMultiplier(0.80, 1.2),
        normal: getRandomMultiplier(0.80, 1.2),
    },
    water: {
        water: getRandomMultiplier(0.3, 0.5),
        grass: getRandomMultiplier(0.5, 0.7),
        fire: getRandomMultiplier(1.3, 1.6),
        electric: getRandomMultiplier(0.80, 1.2),
        normal: getRandomMultiplier(0.80, 1.2),
    },
    grass: {
        grass: getRandomMultiplier(0.3, 0.5),
        fire: getRandomMultiplier(0.5, 0.7),
        water: getRandomMultiplier(1.3, 1.6),
        electric: getRandomMultiplier(0.80, 1.2),
        normal: getRandomMultiplier(0.80, 1.2),
    },
    electric: {
        electric: getRandomMultiplier(0.3, 0.5),
        water: getRandomMultiplier(0.5, 0.7),
        grass: getRandomMultiplier(1.3, 1.6),
        fire: getRandomMultiplier(0.80, 1.2),
        normal: getRandomMultiplier(0.80, 1.2),
    },
    normal: {
        electric: getRandomMultiplier(0.80, 1.2),
        water: getRandomMultiplier(0.80, 1.2),
        grass: getRandomMultiplier(0.80, 1.2),
        fire: getRandomMultiplier(0.80, 1.2),
        normal: getRandomMultiplier(0.80, 1.2),
    }
}
function getRandomMultiplier(min, max) {
    return Math.random() * (max - min) + min;
};