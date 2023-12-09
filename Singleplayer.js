"use strict";
const mokepons = {
    beedrill: {
        name: 'beedrill',
        sprite: "components/sprites/beedrill.gif",
        back_sprite: "components/sprites/beedrill-back.gif",
        type: 'electric',
        attacks: [
            { name: 'Electric Jab', type: 'electric', color: 'khaki', basePower: 10 },
            { name: 'Twister', type: 'normal', color: 'white', basePower: 8 },
            { name: 'U-turn', type: 'grass', color: 'mediumseagreen', basePower: 10 },
            { name: 'E-Scissor', type: 'electric', color: 'khaki', basePower: 8 }
        ]
    },
    bulbasaur: {
        name: 'bulbasaur',
        sprite: "components/sprites/bulbasaur.gif",
        back_sprite: "components/sprites/bulbasaur-back.gif",
        type: 'water',
        attacks: [
            { name: 'Water Whip', type: 'water', color: 'darkturquoise', basePower: 10 },
            { name: 'Growl', type: 'normal', color: 'white', basePower: 8 },
            { name: 'Razor Water', type: 'water', color: 'darkturquoise', basePower: 10 },
            { name: 'Aqua Powder', type: 'water', color: 'darkturquoise', basePower: 10 }
        ]
    },
    caterpie: {
        name: 'caterpie',
        sprite: "components/sprites/caterpie.gif",
        back_sprite: "components/sprites/caterpie-back.gif",
        type: 'grass',
        attacks: [
            { name: 'Tackle', type: 'normal', color: 'white', basePower: 8 },
            { name: 'Leaf Shot', type: 'grass', color: 'mediumseagreen', basePower: 10 },
            { name: 'Bug Bite', type: 'grass', color: 'mediumseagreen', basePower: 10 },
            { name: 'Silken Web', type: 'grass', color: 'mediumseagreen', basePower: 10 }
        ]
    },
    charizard: {
        name: 'charizard',
        sprite: "components/sprites/charizard.gif",
        back_sprite: "components/sprites/charizard-back.gif",
        type: 'fire',
        attacks: [
            { name: 'Flamethrower', type: 'fire', color: 'crimson', basePower: 10 },
            { name: 'Air Slash', type: 'normal', color: 'white', basePower: 8 },
            { name: 'Fire Whip', type: 'fire', color: 'crimson', basePower: 10 },
            { name: 'Punch', type: 'normal', color: 'white', basePower: 8 }
        ]
    }
};

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
        electric: getRandomMultiplier(0.3, 0.5),
        water: getRandomMultiplier(0.5, 0.7),
        grass: getRandomMultiplier(1.3, 1.6),
        fire: getRandomMultiplier(0.80, 1.2),
        normal: getRandomMultiplier(0.80, 1.2),
    }
}
function getRandomMultiplier(min, max) {
    return Math.random() * (max - min) + min;
};

// SECTION FOR PLAYER MOKEPON SELECTION
// Initialize selectedMokepon before attaching event listeners
let selectedMokepon = null;

// Add event listeners to Menu Mokepon buttons
const mokeponButtons = document.querySelectorAll('.mokepon-selection-button');
mokeponButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const mokeponName = button.id.split('-')[0];
        selectedMokepon = mokepons[mokeponName];
    });
});

// Once selected and next button pressed change and add different css classes to componenets to make them appear on screen
const nextMenuButton = document.querySelector('.next-menu-button');
const contextInfoElement = document.querySelector('.context-info');
nextMenuButton.addEventListener('click', () => {
    const selectedImage = document.querySelector(`img[src="${selectedMokepon.back_sprite}"]`);
    selectedImage.classList.add('you');
    selectedImage.style.display = 'flex';
    secondMenu.style.display = 'none';
    youStatus.classList.add('fade-in');
    oponentStatus.classList.add('fade-in');
    bottomInfo.classList.add('fade-in');
    const playerMokeponElement = document.querySelector('.you-status h2');
    playerMokeponElement.textContent = selectedMokepon.name;
    contextInfoElement.textContent = `You choose ${selectedMokepon.name}!`;
});


// change attack buttons to ones corresponding to Mokepon attack names
const populateAttackButtons = () => {
    const attackButtons = document.querySelectorAll('.attack-btn');
    for (let i = 0; i < attackButtons.length; i++) {
        const attack = selectedMokepon.attacks[i];
        attackButtons[i].textContent = attack.name;
    }
};

// change attack buttons colors to ones corresponding to Mokepon attack
const AttackButtonColors = () => {
    const attackButtons = document.querySelectorAll('.attack-btn');
    for (let i = 0; i < attackButtons.length; i++) {
        const color = selectedMokepon.attacks[i].color;
        attackButtons[i].style.backgroundColor = color;
    }
};

// Add event listeners to Mokepon selection buttons to update attack button names and color
document.querySelectorAll('.mokepon-selection-button').forEach((button) => {
    button.addEventListener('click', () => {
        const mokeponName = button.id.split('-')[0];
        selectedMokepon = mokepons[mokeponName];
        populateAttackButtons();
        AttackButtonColors();
    });
});


// SECTION FOR AI MOKEPON SELECTION
// Initialize variable to store the AI's selected Mokepon object
let AI_selectedMokepon = null;

function AI_computerSelectMokepon() {
    const mokeponNames = Object.keys(mokepons); // Extract an array of Mokepon names
    const randomIndex = Math.floor(Math.random() * mokeponNames.length); // Generate a random index within the range of Mokepon names
    const selectedMokeponName = mokeponNames[randomIndex]; // Retrieve the corresponding Mokepon name and object
    const ai_selectedMokepon = mokepons[selectedMokeponName];
    AI_selectedMokepon = ai_selectedMokepon; // Store the AI's selected Mokepon object

    // Update the AI's Mokepon sprite display
    const AI_selectedImage = document.querySelector(`img[src="components/sprites/${selectedMokeponName}.gif"]`);
    AI_selectedImage.classList.add('oponent');
    AI_selectedImage.style.display = 'flex';
    const aiMokeponElement = document.querySelector('.oponent-status h2');
    aiMokeponElement.textContent = selectedMokeponName;
};

const AI_nextMenuButton = document.querySelector('.next-menu-button');
AI_nextMenuButton.addEventListener('click', () => {
    if (selectedButton) {
        return AI_computerSelectMokepon();
    } else {
        console.log('Please select a Mokepon first');
    }
});


// SINGLE PLAYER GAME LOGIC AFTER MENU SELECTION SCREENS
// Turn-based logic data
let attack = null;
let isPlayerTurn = true;
let playerHP = 1;
let ai_HP = 100;


// PLAYER GAME LOGIC ///////////////////////////////////////////////////
// Handle player attack selection
const playerAttackButtons = document.querySelectorAll('.attack-btn');
for (let i = 0; i < playerAttackButtons.length; i++) {
    const attackButton = playerAttackButtons[i];

    attackButton.addEventListener('click', () => {
        // Disable all attack buttons
        for (const button of playerAttackButtons) {
            button.classList.add('disabled');
            button.style.backgroundColor = '#808080'; //dark gray
        }

        // Enable all attack buttons after 7 seconds
        setTimeout(() => {
            for (const button of playerAttackButtons) {
                button.classList.remove('disabled');
                AttackButtonColors() // Retrieve attack colors for buttons
            }
        }, 7000);

        let attack = selectedMokepon.attacks[i];
        executePlayerAttack(attack);
        isPlayerTurn = false;
        setTimeout(AIAttackSelection, 4000);
    });
}

// Execute attack selected by player
function executePlayerAttack(attack) {
    let opponentType = AI_selectedMokepon.type
    let damageMultiplier = calculateDamageMultiplier(attack, opponentType);
    let damage = attack.basePower * damageMultiplier;
    let damageRound = Math.floor(damage)

    ai_HP -= damageRound;
    setTimeout(() => { checkGameOver(); }, 4000)

    // Show attack and damage information in context-info 
    let newContextInfoText = `Your ${selectedMokepon.name} attacks with: ${attack.name}! it deals ${damageRound} points of damage to your oponents ${AI_selectedMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');

    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    }

    playerAnimation(); // animate attack
    setTimeout(updateHPDOMElement(ai_HP, 'oponent-status-hp')), 100;
    isPlayerTurn = false; // Set isPlayerTurn to false
}



// Player Animations when attacking 
function playerAnimation() {
    const selectedImage = document.querySelector(`img[src="${selectedMokepon.back_sprite}"]`);
    selectedImage.style.transition = `transform 0.4s linear, transform 0.4s linear`; // slide animation
    selectedImage.style.transform = `translateX(50px) translateY(-50px)`; //slide right

    setTimeout(() => { // Move sprite back to original position
        selectedImage.style.transform = `translateX(0px) translateY(0px)`;
    }, 500);

    setTimeout(() => { //Stop the animation
        selectedImage.style.transform = '';
    }, 500);

    const AI_selectedImage = document.querySelector(`img[src="components/sprites/${AI_selectedMokepon.name}.gif"]`);

    setTimeout(() => { // AI flicker white when attacked
        AI_selectedImage.style.filter = 'brightness(100)';
        setTimeout(() => {  // AI back to normal
            AI_selectedImage.style.filter = 'brightness(1)';
        }, 120);
    }, 200)
}

// AI GAME LOGIC ///////////////////////////////////////////////////
// AI attack selection function
function AIAttackSelection() {
    if (!isPlayerTurn && (playerHP > 0 && ai_HP > 0)) {
        const AIAttacks = AI_selectedMokepon.attacks;
        let opponentType = selectedMokepon.type
        let randomIndex = Math.floor(Math.random() * AIAttacks.length);
        let attack = AIAttacks[randomIndex];
        setTimeout(executeAIAttack(attack, opponentType), 2000)
    }
}

// Execute attack selected for AI
function executeAIAttack(attack, opponentType) {
    // Calculate damage multiplier based on AI attack type and player's selected Mokepon type
    let damageMultiplier = calculateDamageMultiplier(attack, opponentType);
    let damage = attack.basePower * damageMultiplier;
    let damageRound = Math.floor(damage)

    playerHP -= damageRound
    setTimeout(() => { checkGameOver(); }, 4000)


    // show attack and damage information in context-info 
    let newContextInfoText = `Your oponents ${AI_selectedMokepon.name} attacks with: ${attack.name}! it deals ${damageRound} points of damage to your ${selectedMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');
    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    }

    ai_Animation() // animate attack
    setTimeout(updateHPDOMElement(playerHP, 'you-status-hp'), 100);
    isPlayerTurn = true;
}

// AI Animations when attacking 
function ai_Animation() {
    const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_selectedMokepon.name}.gif"]`);


    ai_selectedImage.style.transition = `transform 0.3s linear, transform 0.3s linear`; // Animate the sprite's transformation
    ai_selectedImage.style.transform = `translateX(-100px) translateY(-15px)`; // Animate the sprite to move to the right and slightly up

    // Add transition for movement back to original position
    setTimeout(() => {
        ai_selectedImage.style.transform = `translateX(0px) translateY(0px)`; // Move the sprite back to its original position
    }, 500); // Slide for 0.5 seconds
    setTimeout(() => {
        ai_selectedImage.style.transform = ''; // Remove the transform to stop the animation
    }, 500);

    const playerSelectedImage = document.querySelector(`img[src="${selectedMokepon.back_sprite}"]`
    );
    setTimeout(() => {
        playerSelectedImage.style.filter = 'brightness(100)'; // Set opacity to 0 to make the image invisible
        setTimeout(() => {
            playerSelectedImage.style.filter = 'brightness(1)'; // Set opacity back to 1 to make the image visible
        }, 120);
    }, 200)
}


// DAMAGE MULTIPLIER FUNCTION AND HP STATUS UNPDATE ////////////////////////////////////////
// Damage multiplier calculator depending on attack type and against what mokepon it is used
function calculateDamageMultiplier(attack, opponentType) {

    let basePower = attack.basePower; // Get the attack's base power

    let typeChartValue = typeChart[attack.type][opponentType]; // Get the damage multiplier value from the type chart

    const actualDamage = basePower * typeChartValue;

    return typeChartValue;
}




// Update hp number data each time the player or the AI takes damage
function updateHPDOMElement(currentHP, targetClassName) {
    const playerDOMHP = document.querySelector('.you-status-hp h3');
    const AI_DOMHP = document.querySelector('.oponent-status-hp h3');

    if (isPlayerTurn) {
        AI_DOMHP.textContent = (ai_HP.toFixed(1)); // Update AI HP with one decimal place
    } else {
        playerDOMHP.textContent = (playerHP.toFixed(1)); // Update player HP with one decimal place
    }
};

function checkGameOver() {
    if (playerHP <= 0) {
        const endGameMenu = document.querySelector('.end-menu')
        const endMenuTitle = document.querySelector('.end-menu-title')
        const selectedImage = document.querySelector(`img[src="${selectedMokepon.back_sprite}"]`);


        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You loose!'
        selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        selectedImage.style.filter = "opacity(1)"


    } else if (ai_HP <= 0) {
        const endGameMenu = document.querySelector('.end-menu')
        const endMenuTitle = document.querySelector('.end-menu-title')
        const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_selectedMokepon.name}.gif"]`);


        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You Win!'
        ai_selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        ai_selectedImage.style.filter = "opacity(1)"



    }
}


