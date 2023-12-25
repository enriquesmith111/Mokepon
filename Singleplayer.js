"use strict"

let selectedMokepon = null;
let AI_selectedMokepon = null;

// make player and AI sprites appear after next button is pressed
const nextMenuButton = document.querySelector('.next-menu-button');
const contextInfoElement = document.querySelector('.context-info');
const playerMokeponElement = document.querySelector('.you-status h2');

nextMenuButton.addEventListener('click', () => {
    const selectedImage = document.querySelector(`img[src="components/sprites/${selectedMokepon.name}-back.gif"]`);
    selectedImage.classList.add('you');
    selectedImage.style.display = 'flex';
    secondMenu.style.display = 'none';
    youStatus.classList.add('fade-in');
    oponentStatus.classList.add('fade-in');
    bottomInfo.classList.add('fade-in');
    playerMokeponElement.textContent = selectedMokepon.name;
    contextInfoElement.textContent = `You choose ${selectedMokepon.name}!`;
    AI_computerSelectMokepon(); // AI sprite appear function
});


// change attack buttons to ones corresponding to Mokepon attack names and colors
const attackButtons = document.querySelectorAll('.attack-btn');
const SwapMokeponBtn = document.querySelector('#swap-btn');

const populateAttackButtons = () => {
    for (let i = 0; i < attackButtons.length; i++) {
        const attack = selectedMokepon.attacks[i];
        attackButtons[i].textContent = attack.name;
    }
};
const AttackButtonColors = () => {
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
const aiMokeponElement = document.querySelector('.oponent-status h2');

function AI_computerSelectMokepon() {
    const mokeponNames = Object.keys(mokepons); // Extract an array of Mokepon names
    const randomIndex = Math.floor(Math.random() * mokeponNames.length); // Generate a random index in range of Mokepon names
    const selectedMokeponName = mokeponNames[randomIndex]; // Retrieve corresponding Mokepon name and object
    const ai_selectedMokepon = mokepons[selectedMokeponName];
    AI_selectedMokepon = ai_selectedMokepon; // Store AI selected Mokepon object

    // Update the AI's Mokepon sprite display and info
    const AI_selectedImage = document.querySelector(`img[src="components/sprites/${AI_selectedMokepon.name}.gif"]`);
    AI_selectedImage.classList.add('oponent');
    AI_selectedImage.style.display = 'flex';
    aiMokeponElement.textContent = AI_selectedMokepon.name;
};


// SINGLE PLAYER GAME LOGIC AFTER MENU SELECTION SCREENS
// Turn-based logic data
let attack = null;
let isPlayerTurn = true;
let playerHP = 100;
let ai_HP = 100;


// PLAYER GAME LOGIC ///////////////////////////////////////////////////
// Handle player attack selection
const playerAttackButtons = document.querySelectorAll('.attack-btn');
const attackButtonsArray = Array.from(playerAttackButtons);

for (let i = 0; i < attackButtonsArray.length; i++) {
    const attackButton = attackButtonsArray[i];

    attackButton.addEventListener('click', () => {
        disableAllButtons(attackButtonsArray);
        enableAllButtons(attackButtonsArray);
        if (selectedMokepon != null) {
            let attack = selectedMokepon.attacks[i];
            executePlayerAttack(attack);
        }
        isPlayerTurn = false;
        setTimeout(AIAttackSelection, 4000);
    });
}


// Execute attack selected by player
function executePlayerAttack(attack) {
    let opponentType = AI_selectedMokepon.type
    let damageMultiplier = calculateDamageMultiplier(attack, opponentType);
    let damage = attack.basePower * damageMultiplier;
    let randomFactor = Math.random() * (1.25 - 0.8) + 0.8;
    let damageRound = Math.floor(damage * randomFactor);

    ai_HP -= damageRound;
    setTimeout(() => { checkGameOver(); }, 4000)

    // Show attack and damage information in context-info 
    let newContextInfoText = `Your ${selectedMokepon.name} attacks with: ${attack.name}!
    It deals ${damageRound} points of damage to your oponents ${AI_selectedMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');

    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    };
    playerAnimation(attack); // animate attack
    setTimeout(updateHPDOMElement(ai_HP, 'oponent-status-hp')), 100;
    isPlayerTurn = false; // Set isPlayerTurn to false
}

// Player Animations when attacking 
function playerAnimation(attack) {
    const selectedImage = document.querySelector(`img[src="${selectedMokepon.back_sprite}"]`);
    const playerAttackImage = document.querySelector(`.player-${attack.type}-attack`)

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

    if (attack.type != 'normal') {
        fadeInAndOut(playerAttackImage);
    }
}

// AI GAME LOGIC ///////////////////////////////////////////////////
// AI attack selection function
function AIAttackSelection() {
    if (!isPlayerTurn && (playerHP > 0 && ai_HP > 0) && AI_selectedMokepon != null) {
        const AIAttacks = AI_selectedMokepon.attacks;
        let opponentType = selectedMokepon.type
        let randomIndex = Math.floor(Math.random() * AIAttacks.length);
        let attack = AIAttacks[randomIndex];
        setTimeout(executeAIAttack(attack, opponentType), 2500)
    }
}

// Execute attack selected for AI
function executeAIAttack(attack, opponentType) {
    // Calculate damage multiplier based on AI attack type and player's selected Mokepon type
    let damageMultiplier = calculateDamageMultiplier(attack, opponentType);
    let damage = attack.basePower * damageMultiplier;
    let randomFactor = Math.random() * (1.4 - 0.8) + 0.8;
    let damageRound = Math.floor(damage * randomFactor);

    playerHP -= damageRound
    setTimeout(() => { checkGameOver(); }, 4000)

    // show attack and damage information in context-info 
    let newContextInfoText = `Your oponents ${AI_selectedMokepon.name} attacks with: ${attack.name}!
    It deals ${damageRound} points of damage to your ${selectedMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');
    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    }

    ai_Animation(attack) // animate attack
    setTimeout(updateHPDOMElement(playerHP, 'you-status-hp'), 100);
    isPlayerTurn = true;
    // return damageRound;
}

// AI Animations when attacking 
function ai_Animation(attack) {
    const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_selectedMokepon.name}.gif"]`);
    const aiAttackImage = document.querySelector(`.ai-${attack.type}-attack`)

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

    if (attack.type != 'normal') {
        fadeInAndOut(aiAttackImage);
    }
}

// Damage multiplier calculator depending on attack type and against what mokepon it is used
function calculateDamageMultiplier(attack, opponentType) {

    let typeChartValue = typeChart[attack.type][opponentType]; // Get the damage multiplier value from the type chart

    return typeChartValue;
}

// Update hp number data each time the player or the AI takes damage
let ai_HP_before = ai_HP;
let player_HP_before = playerHP;
let damageDealt = 0;

const playerDOMHP = document.querySelector('.you-status-hp h3');
const AI_DOMHP = document.querySelector('.oponent-status-hp h3');
const pDamageTaken = document.querySelector('.you-damage-taken');
const aiDamageTaken = document.querySelector('.oponent-damage-taken');

function updateHPDOMElement() {
    if (isPlayerTurn) {
        damageDealt = ai_HP_before - ai_HP;
        aiDamageTaken.textContent = `-${damageDealt}`;
        AI_DOMHP.textContent = ai_HP;
        fadeInAndOut(aiDamageTaken); // Apply fade-in and fade-out effect to AI damageDealt
        ai_HP_before = ai_HP; // Update ai_HP_before for the next turn
    } else {
        damageDealt = player_HP_before - playerHP;
        pDamageTaken.textContent = `-${damageDealt}`;
        playerDOMHP.textContent = playerHP;
        fadeInAndOut(pDamageTaken); // Apply fade-in and fade-out effect to AI damageDealt
        player_HP_before = playerHP; // Update player_HP_before for the next turn
    }
};

function checkGameOver() {
    const endGameMenu = document.querySelector('.end-menu')
    const endMenuTitle = document.querySelector('.end-menu-title')
    const selectedImage = document.querySelector(`img[src="${selectedMokepon.back_sprite}"]`);
    const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_selectedMokepon.name}.gif"]`);

    if (playerHP <= 0) {
        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You loose!'
        selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        selectedImage.style.filter = "opacity(1)"
    } else if (ai_HP <= 0) {
        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You Win!'
        ai_selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        ai_selectedImage.style.filter = "opacity(1)"
    }
}

function disableAllButtons(buttons) {
    for (const button of buttons) {
        SwapMokeponBtn.classList.add('disabled');
        SwapMokeponBtn.style.backgroundColor = '#808080'; //dark gray
        SwapMokeponBtn.disabled = true; // Make the button fully unclickable
        button.classList.add('disabled');
        button.style.backgroundColor = '#808080'; //dark gray
        button.disabled = true; // Make the button fully unclickable
    }
}

function enableAllButtons(buttons) {
    setTimeout(() => {
        for (const button of buttons) {
            button.classList.remove('disabled');
            if (selectedMokepon != undefined) {
                AttackButtonColors() // Retrieve attack colors for buttons
                SwapMokeponBtn.style.background = 'white'
            }
            button.disabled = false; // Make the button fully unclickable
            SwapMokeponBtn.disabled = false; // Make the button fully unclickable
        }
    }, 7000);// enable after seven seconds
}

// make element gradually fade in and out
function fadeInAndOut(element) {
    element.style.display = 'flex';
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.75s linear';
    element.style.opacity = '1';
    setTimeout(() => {
        element.style.opacity = '0';
    }, 1500);
}