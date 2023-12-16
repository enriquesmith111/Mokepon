let multiplier = 0;
function getRandomMultiplier(min, max) {
    if (multiplier) {
        multiplier = 0; // Reset the multiplier to 0 before generating a new one
    }
    multiplier = Math.random() * (max - min) + min;
    console.log(multiplier);
    return multiplier
};

const typeChart = {
    fire: {
        fire: getRandomMultiplier(0.3, 0.6),
        water: getRandomMultiplier(0.4, 0.8),
        grass: getRandomMultiplier(1.2, 1.8),
        electric: getRandomMultiplier(0.7, 1.3),
        normal: getRandomMultiplier(0.7, 1.3),
    },
    water: {
        water: getRandomMultiplier(0.3, 0.6),
        grass: getRandomMultiplier(0.4, 0.8),
        fire: getRandomMultiplier(1.2, 1.8),
        electric: getRandomMultiplier(0.7, 1.3),
        normal: getRandomMultiplier(0.7, 1.3),
    },
    grass: {
        grass: getRandomMultiplier(0.3, 0.6),
        fire: getRandomMultiplier(0.4, 0.8),
        water: getRandomMultiplier(1.2, 1.8),
        electric: getRandomMultiplier(0.7, 1.3),
        normal: getRandomMultiplier(0.7, 1.3),
    },
    electric: {
        electric: getRandomMultiplier(0.3, 0.6),
        water: getRandomMultiplier(0.4, 0.8),
        grass: getRandomMultiplier(1.2, 1.8),
        fire: getRandomMultiplier(0.7, 1.3),
        normal: getRandomMultiplier(0.7, 1.3),
    },
    normal: {
        electric: getRandomMultiplier(0.7, 1.3),
        water: getRandomMultiplier(0.7, 1.3),
        grass: getRandomMultiplier(0.7, 1.3),
        fire: getRandomMultiplier(0.7, 1.3),
        normal: getRandomMultiplier(0.7, 1.3),
    }
}

