"use strict"
let selectedMokepons = [];
let currentMokepon = undefined;

const mokeponButtonsMultiplayer = document.querySelectorAll('.mokepon-selection-button-multiplayer');

mokeponButtonsMultiplayer.forEach((button) => {
    button.addEventListener('click', () => {
        const mokeponName = button.id.split('-')[0];

        const indexOfMokepon = selectedMokepons.indexOf(mokepons[mokeponName]);
        if (indexOfMokepon !== -1) {
            // If the Mokepon is already in the array, remove it
            selectedMokepons.splice(indexOfMokepon, 1);
        } else {
            // If the Mokepon is not in the array, add it
            // Add the new Mokepon to the selected array
            selectedMokepons.push(mokepons[mokeponName]);

            // If the array is full, remove the oldest Mokepon from the array
            if (selectedMokepons.length === 3) {
                selectedMokepons.pop();
            }
        }

        // Log the selected Mokepon names to the console
    });
});

nextButtonMultiplayer.addEventListener('click', () => {
    const selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
    currentMokepon = selectedMokepons[0];
    SwapMokeponBtn.style.display = 'flex';
    selectedImage.classList.add('you');
    selectedImage.style.display = 'flex';
    secondMenuMultiplayer.style.display = 'none';
    youStatus.classList.add('fade-in');
    oponentStatus.classList.add('fade-in');
    bottomInfo.classList.add('fade-in');
    const playerMokeponElement = document.querySelector('.you-status h2');
    playerMokeponElement.textContent = currentMokepon.name;
    contextInfoElement.textContent = `You choose ${currentMokepon.name}!`;
});

// change attack buttons to ones corresponding to Mokepon attack names
const populateAttackButtonsMultiplayer = () => {
    const attackButtonsMultiplayer = document.querySelectorAll('.attack-btn');
    for (let i = 0; i < attackButtonsMultiplayer.length; i++) {
        const attackMultiplayer = currentMokepon.attacks[i];
        attackButtonsMultiplayer[i].textContent = attackMultiplayer.name;
    }
};

// change attack buttons colors to ones corresponding to Mokepon attack
const AttackButtonColorsMultiplayer = () => {
    const attackButtonsMultiplayer = document.querySelectorAll('.attack-btn');
    for (let i = 0; i < attackButtonsMultiplayer.length; i++) {
        const color = currentMokepon.attacks[i].color;
        attackButtonsMultiplayer[i].style.backgroundColor = color;
    }
};

// Add event listeners to Mokepon selection buttons to update attack button names and color
document.querySelectorAll('.mokepon-selection-button-multiplayer').forEach((button) => {
    button.addEventListener('click', () => {
        currentMokepon = selectedMokepons[0];
        populateAttackButtonsMultiplayer();
        AttackButtonColorsMultiplayer();
    });
});

// SECTION FOR AI MOKEPON SELECTION
// Initialize variable to store the AI's selected Mokepon object
let AI_selectedMokepons = [];
let AI_currentMokepon = undefined;


function AI_computerSelectMokeponMultiplayer() {
    const mokeponNames = Object.keys(mokepons); // Extract an array of Mokepon names

    // Select two random Mokepons
    const randomIndex1 = Math.floor(Math.random() * mokeponNames.length);
    let selectedMokeponName1 = mokeponNames[randomIndex1];

    let randomIndex2 = Math.floor(Math.random() * mokeponNames.length);
    let selectedMokeponName2 = mokeponNames[randomIndex2];

    if (selectedMokeponName1 === selectedMokeponName2) {
        randomIndex2 = Math.floor(Math.random() * mokeponNames.length);
        selectedMokeponName2 = mokeponNames[randomIndex2];
    }

    const ai_selectedMokepon1 = mokepons[selectedMokeponName1];
    const ai_selectedMokepon2 = mokepons[selectedMokeponName2];

    // Store the selected Mokepons in the array
    AI_selectedMokepons = [ai_selectedMokepon1, ai_selectedMokepon2]; // Store the AI's selected Mokepon object
    AI_currentMokepon = AI_selectedMokepons[0];

    // Update the AI's Mokepon sprite display
    const AI_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);
    AI_selectedImage.classList.add('oponent');
    AI_selectedImage.style.display = 'flex';
    const aiMokeponElement = document.querySelector('.oponent-status h2');
    aiMokeponElement.textContent = AI_currentMokepon.name;
};

const AI_nextMenuButtonMultiplayer = document.querySelector('.next-menu-button-multiplayer');
AI_nextMenuButtonMultiplayer.addEventListener('click', () => {
    if (AI_nextMenuButtonMultiplayer) {
        return AI_computerSelectMokeponMultiplayer();
    } else {
    }
});

// Turn-based logic data
let attackMultiplayer = null;
let isPlayerTurnMultiplayer = true;
let playerHPMultiplayer = 100;
let ai_HPMultiplayer = 100;


SwapMokeponBtn.addEventListener('click', () => {
    SwapMokepon()
    setTimeout(AIAttackSelectionMultiplayer, 4000);
})

const playerAttackButtonsMultiplayer = document.querySelectorAll('.attack-btn');
for (let i = 0; i < playerAttackButtonsMultiplayer.length; i++) {
    const attackButtonMultiplayer = playerAttackButtonsMultiplayer[i];

    attackButtonMultiplayer.addEventListener('click', () => {
        // Disable all attack buttons
        for (const button of playerAttackButtonsMultiplayer) {
            button.classList.add('disabled');
            button.style.backgroundColor = '#808080'; //dark gray
            button.disabled = true; // Make the button fully unclickable
        }

        // Enable all attack buttons after 7 seconds
        setTimeout(() => {
            for (const button of playerAttackButtonsMultiplayer) {
                button.classList.remove('disabled');
                if (currentMokepon != undefined) {
                    AttackButtonColorsMultiplayer() // Retrieve attack colors for buttons
                }
                button.disabled = false; // Make the button fully unclickable
            }
        }, 7000);
        if (currentMokepon != undefined) {
            let attackMultiplayer = currentMokepon.attacks[i];
            executePlayerAttackMultiplayer(attackMultiplayer);
        }
        isPlayerTurnMultiplayer = false;
        setTimeout(AIAttackSelectionMultiplayer, 4000);
    });
}

// Execute attack selected by player
function executePlayerAttackMultiplayer(attackMultiplayer) {
    let opponentType = AI_currentMokepon.type

    let damageMultiplier = calculateDamageMultiplierMultiplayer(attackMultiplayer, opponentType);
    let damage = attackMultiplayer.basePower * damageMultiplier;
    let randomFactor = Math.random() * (1.4 - 0.8) + 0.8;
    let damageRound = Math.floor(damage * randomFactor);

    AI_currentMokepon.hp -= damageRound;
    setTimeout(() => { checkGameOverMultiplayer(); }, 4000)

    // Show attack and damage information in context-info 
    let newContextInfoText = `Your ${currentMokepon.name} attacks with: ${attackMultiplayer.name}! it deals ${damageRound} points of damage to your oponents ${AI_currentMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');

    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    };


    playerAnimationMultiplayer(); // animate attack
    playerAttackAnimationMultiplayer(attackMultiplayer) // animate attack sprite
    setTimeout(updateHPDOMElementMultiplayer(ai_HPMultiplayer, 'oponent-status-hp')), 100;
    isPlayerTurnMultiplayer = false; // Set isPlayerTurn to false
}

// Player Animations when attacking 
function playerAnimationMultiplayer() {
    const selectedImage = document.querySelector(`img[src="${currentMokepon.back_sprite}"]`);
    selectedImage.style.transition = `transform 0.4s linear, transform 0.4s linear`; // slide animation
    selectedImage.style.transform = `translateX(50px) translateY(-50px)`; //slide right

    setTimeout(() => { // Move sprite back to original position
        selectedImage.style.transform = `translateX(0px) translateY(0px)`;
    }, 500);

    setTimeout(() => { //Stop the animation
        selectedImage.style.transform = '';
    }, 500);

    const AI_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);

    setTimeout(() => { // AI flicker white when attacked
        AI_selectedImage.style.filter = 'brightness(100)';
        setTimeout(() => {  // AI back to normal
            AI_selectedImage.style.filter = 'brightness(1)';
        }, 120);
    }, 200)
}

function playerAttackAnimationMultiplayer(attackMultiplayer) {
    const playerAttackImage = document.querySelector(`.player-${attackMultiplayer.type}-attack`)

    if (attackMultiplayer.type != 'normal') {
        fadeInAndOutMultiplayer(playerAttackImage);
    }
}

// AI GAME LOGIC ///////////////////////////////////////////////////
// AI attack selection function
function AIAttackSelectionMultiplayer() {
    if (!isPlayerTurnMultiplayer && (playerHPMultiplayer > 0 && ai_HPMultiplayer > 0) && currentMokepon != undefined) {
        const AIAttacksMultiplayer = AI_currentMokepon.attacks;
        let opponentType = AI_currentMokepon.type
        let randomIndex = Math.floor(Math.random() * AIAttacksMultiplayer.length);
        let attackMultiplayer = AIAttacksMultiplayer[randomIndex];
        setTimeout(executeAIAttackMultiplayer(attackMultiplayer, opponentType), 2500)
    }
}

// Execute attack selected for AI
function executeAIAttackMultiplayer(attackMultiplayer, opponentType) {
    // Calculate damage multiplier based on AI attack type and player's selected Mokepon type
    let damageMultiplier = calculateDamageMultiplierMultiplayer(attackMultiplayer, opponentType);
    let damage = attackMultiplayer.basePower * damageMultiplier;
    let randomFactor = Math.random() * (1.4 - 0.8) + 0.8;
    let damageRound = Math.floor(damage * randomFactor);

    currentMokepon.hp -= damageRound
    setTimeout(() => { checkGameOverMultiplayer(); }, 4000)


    // show attack and damage information in context-info 
    let newContextInfoText = `Your oponents ${AI_currentMokepon.name} attacks with: ${attackMultiplayer.name}! it deals ${damageRound} points of damage to your ${currentMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');
    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    }

    ai_AnimationMultiplayer() // animate attack
    aiAttackAnimationMultiplayer(attackMultiplayer) // animate attack sprite
    setTimeout(updateHPDOMElementMultiplayer(playerHPMultiplayer, 'you-status-hp'), 100);
    isPlayerTurnMultiplayer = true;
    return damageRound;
}

// AI Animations when attacking 
function ai_AnimationMultiplayer() {
    const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);


    ai_selectedImage.style.transition = `transform 0.3s linear, transform 0.3s linear`; // Animate the sprite's transformation
    ai_selectedImage.style.transform = `translateX(-100px) translateY(-15px)`; // Animate the sprite to move to the right and slightly up

    // Add transition for movement back to original position
    setTimeout(() => {
        ai_selectedImage.style.transform = `translateX(0px) translateY(0px)`; // Move the sprite back to its original position
    }, 500); // Slide for 0.5 seconds
    setTimeout(() => {
        ai_selectedImage.style.transform = ''; // Remove the transform to stop the animation
    }, 500);

    const playerSelectedImage = document.querySelector(`img[src="${currentMokepon.back_sprite}"]`
    );
    setTimeout(() => {
        playerSelectedImage.style.filter = 'brightness(100)'; // Set opacity to 0 to make the image invisible
        setTimeout(() => {
            playerSelectedImage.style.filter = 'brightness(1)'; // Set opacity back to 1 to make the image visible
        }, 120);
    }, 200)
}

function aiAttackAnimationMultiplayer(attackMultiplayer) {
    const aiAttackImage = document.querySelector(`.ai-${attackMultiplayer.type}-attack`)

    if (attackMultiplayer.type != 'normal') {
        fadeInAndOutMultiplayer(aiAttackImage);
    }

}


// DAMAGE MULTIPLIER FUNCTION AND HP STATUS UNPDATE ////////////////////////////////////////
// Damage multiplier calculator depending on attack type and against what mokepon it is used
function calculateDamageMultiplierMultiplayer(attackMultiplayer, opponentType) {
    let typeChartValue = typeChart[attackMultiplayer.type][opponentType]; // Get the damage multiplier value from the type chart

    return typeChartValue;
}


// Update hp number data each time the player or the AI takes damage
let ai_HP_beforeMultiplayer = ai_HPMultiplayer;
let player_HP_beforeMultiplayer = playerHPMultiplayer;
let damageDealtMultiplayer = 0;

function fadeInAndOutMultiplayer(element) {
    element.style.display = 'flex';

    // Set opacity to 0 and set transition duration to 1 second
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.75s linear';

    // Gradually increase opacity to 1
    element.style.opacity = '1';

    // After 1 second, gradually decrease opacity to 0
    setTimeout(() => {
        element.style.opacity = '0';
    }, 1500);
}

function updateHPDOMElementMultiplayer() {
    const playerDOMHP = document.querySelector('.you-status-hp h3');
    const AI_DOMHP = document.querySelector('.oponent-status-hp h3');
    const pDamageTaken = document.querySelector('.you-damage-taken');
    const aiDamageTaken = document.querySelector('.oponent-damage-taken');


    if (isPlayerTurnMultiplayer) {
        damageDealt = ai_HP_beforeMultiplayer - AI_currentMokepon.hp;
        aiDamageTaken.textContent = `-${damageDealt}`;
        AI_DOMHP.textContent = AI_currentMokepon.hp;
        fadeInAndOutMultiplayer(aiDamageTaken); // Apply fade-in and fade-out effect to AI damageDealt
        ai_HP_beforeMultiplayer = AI_currentMokepon.hp; // Update ai_HP_before for the next turn
    } else {
        damageDealt = player_HP_beforeMultiplayer - currentMokepon.hp;
        pDamageTaken.textContent = `-${damageDealt}`;
        playerDOMHP.textContent = currentMokepon.hp;
        fadeInAndOutMultiplayer(pDamageTaken); // Apply fade-in and fade-out effect to AI damageDealt
        player_HP_beforeMultiplayer = currentMokepon.hp; // Update player_HP_before for the next turn
    }
};

function checkGameOverMultiplayer() {
    console.log(selectedMokepons[0].hp)
    if (selectedMokepons[0].hp <= 0 && selectedMokepons[1].hp <= 0) {
        const endGameMenu = document.querySelector('.end-menu')
        const endMenuTitle = document.querySelector('.end-menu-title')
        const selectedImage = document.querySelector(`img[src="${currentMokepon.back_sprite}"]`);


        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You loose!'
        selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        selectedImage.style.filter = "opacity(1)"


    } else if (AI_selectedMokepons[0].hp <= 0 && AI_selectedMokepons[1].hp <= 0) {
        const endGameMenu = document.querySelector('.end-menu')
        const endMenuTitle = document.querySelector('.end-menu-title')
        const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);


        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You Win!'
        ai_selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        ai_selectedImage.style.filter = "opacity(1)"
    }
}

function SwapMokepon() {
    let selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
    if ((selectedMokepons[1].hp > 0 && selectedMokepons[0].hp > 0)
        && (currentMokepon === selectedMokepons[0])) {
        selectedImage.classList.remove('you');
        selectedImage.style.display = 'none';

        currentMokepon = selectedMokepons[1]
        selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
        selectedImage.classList.add('you');
        selectedImage.style.display = 'flex';

    } else if ((selectedMokepons[1].hp > 0 && selectedMokepons[0].hp > 0)
        && (currentMokepon === selectedMokepons[1])) {
        selectedImage.classList.remove('you');
        selectedImage.style.display = 'none';

        currentMokepon = selectedMokepons[0]
        selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
        selectedImage.classList.add('you');
        selectedImage.style.display = 'flex';
    }
    isPlayerTurnMultiplayer = false
}



