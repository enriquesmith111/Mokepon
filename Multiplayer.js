"use strict"

// player mokepons and mokepon on screen
let selectedMokepons = [];
let currentMokepon = undefined;

// AI mokepon and mokepon on sceen
let AI_selectedMokepons = [];
let AI_currentMokepon = undefined;

// make player and AI current sprites appear after next button is pressed
const playerMokeponElementM = document.querySelector('.you-status h2');

nextButtonMultiplayer.addEventListener('click', () => {
    const selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
    currentMokepon = selectedMokepons[0]; // first chosen Mokepon becomes current 
    SwapMokeponBtnM.style.display = 'flex'; // show swap btn in multiplayer mode
    selectedImage.classList.add('you');
    selectedImage.style.display = 'flex';
    secondMenuMultiplayer.style.display = 'none';
    youStatus.classList.add('fade-in');
    oponentStatus.classList.add('fade-in');
    bottomInfo.classList.add('fade-in');
    playerMokeponElementM.textContent = currentMokepon.name;
    contextInfoElement.textContent = `You choose ${currentMokepon.name}!`;
    AI_computerSelectMokeponM(); // AI random current Mokepon sprite appear function
});


// change attack buttons to ones corresponding to Mokepon attack names
const attackButtonsM = document.querySelectorAll('.attack-btn');
const SwapMokeponBtnM = document.querySelector('#swap-btn');

const populateAttackButtonsM = () => {
    for (let i = 0; i < attackButtonsM.length; i++) {
        const attackM = currentMokepon.attacks[i];
        attackButtonsM[i].textContent = attackM.name;
    }
};

// change attack buttons colors to ones corresponding to Mokepon attack
const AttackButtonColorsM = () => {
    if (currentMokepon.hp > 0) {
        const attackButtonsM = document.querySelectorAll('.attack-btn');
        for (let i = 0; i < attackButtonsM.length; i++) {
            const color = currentMokepon.attacks[i].color;
            attackButtonsM[i].style.backgroundColor = color;
        }
    }
};

// Add event listeners to Mokepon selection buttons to update attack button names and color
document.querySelectorAll('.mokepon-selection-button-multiplayer').forEach((button) => {
    button.addEventListener('click', () => {
        currentMokepon = selectedMokepons[0];
        populateAttackButtonsM();
        AttackButtonColorsM();
    });
});

// AI random Mokepons selection Function
const aiMokeponElementM = document.querySelector('.oponent-status h2');

function AI_computerSelectMokeponM() {
    const mokeponNames = Object.keys(mokepons); // Extract an array of Mokepon names
    // Select two random Mokepons
    let randomIndex1 = Math.floor(Math.random() * mokeponNames.length);
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
    AI_currentMokepon = AI_selectedMokepons[0]; // first selected mokepon will be current

    // Update the AI's Mokepon sprite display
    const AI_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);
    AI_selectedImage.classList.add('oponent');
    AI_selectedImage.style.display = 'flex';
    aiMokeponElementM.textContent = AI_currentMokepon.name;
};


// MULTIPLAYER GAME LOGIC AFTER MENU SELECTION SCREENS
// Turn-based logic data
let attackM = null;
let isPlayerTurnM = true;
let playerHPM = 20;
let ai_HPM = 20;


// PLAYER GAME LOGIC ///////////////////////////////////////////////////
// Handle player attack selection
const playerAttackButtonsM = document.querySelectorAll('.attack-btn');
const attackButtonsArrayM = Array.from(playerAttackButtons);
// check if mokepon died, if so change mokepon

for (let i = 0; i < attackButtonsArray.length; i++) {
    const attackButtonM = attackButtonsArray[i];
    attackButtonM.addEventListener('click', () => {
        disableAllButtonsM(attackButtonsArrayM);
        if (currentMokepon.hp > 0) {
            enableAllButtonsM(attackButtonsArrayM)
        }
        if (currentMokepon != undefined) {
            let attackM = currentMokepon.attacks[i];
            executePlayerAttackM(attackM);
        }
        isPlayerTurnM = false;
        setTimeout(AIAttackSelectionM, 4000);
    });
}

SwapMokeponBtn.addEventListener('click', () => {
    SwapMokeponButtonM()
    disableAllButtonsM(attackButtonsArrayM)
    if (currentMokepon.hp > 0) {
        enableAllButtonsM(attackButtonsArrayM)
    }
    setTimeout(AIAttackSelectionM, 4000);
})


// Execute attack selected by player
function executePlayerAttackM(attackM) {
    if (currentMokepon.hp > 0) {
        let opponentType = AI_currentMokepon.type
        let damageMultiplier = calculateDamageMultiplierM(attackM, opponentType);
        let damage = attackM.basePower * damageMultiplier;
        let randomFactor = Math.random() * (1.4 - 0.8) + 0.8;
        let damageRound = Math.floor(damage * randomFactor);

        AI_currentMokepon.hp -= damageRound;
        setTimeout(() => { checkGameOverM(); }, 4000)

        // Show attack and damage information in context-info 
        let newContextInfoText = `Your ${currentMokepon.name} attacks with: ${attackM.name}!
    It deals ${damageRound} points of damage to your oponents ${AI_currentMokepon.name}!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');

        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);
        };
        playerAnimationM(attackM); // animate attack
        setTimeout(updateHPDOMElementM(ai_HPM, 'oponent-status-hp')), 100;
        isPlayerTurnM = false; // Set isPlayerTurn to false
    }
}

// Player Animations when attacking 
function playerAnimationM(attackM) {
    const selectedImage = document.querySelector(`img[src="${currentMokepon.back_sprite}"]`);
    const playerAttackImage = document.querySelector(`.player-${attackM.type}-attack`)

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

    if (attackM.type != 'normal') {
        fadeInAndOutM(playerAttackImage);
    }
}

function forceplayerSwap() {
    if ((currentMokepon == selectedMokepons[0])
        && (currentMokepon.hp <= 0 && selectedMokepons[1].hp > 0)) {

        let newContextInfoText = `Your ${currentMokepon.name} has been downed! 
        Call in another Mokepon for help!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');
        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);

            disableAllButtonsM(attackButtonsArrayM)
            SwapMokeponBtn.classList.remove('disabled');
            SwapMokeponBtn.style.backgroundColor = 'white'; //dark gray
            SwapMokeponBtn.disabled = false; // Make the button fully unclickable
            SwapMokeponBtn.addEventListener('click', () => {
                SwapMokeponButtonM()
                disableAllButtonsM(attackButtonsArrayM)
                if (currentMokepon.hp > 0) {
                    enableAllButtonsM(attackButtonsArrayM)
                }
                setTimeout(AIAttackSelectionM, 4000);
            })
        }
    } else if ((currentMokepon == selectedMokepons[1])
        && (currentMokepon.hp <= 0 && selectedMokepons[0].hp > 0)) {

        let newContextInfoText = `Your ${currentMokepon.name} has been downed! 
        Calling in $another Mokepon for help!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');
        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);

            disableAllButtonsM(attackButtonsArrayM)
            SwapMokeponBtn.classList.remove('disabled');
            SwapMokeponBtn.style.backgroundColor = 'white'; //dark gray
            SwapMokeponBtn.disabled = false; // Make the button fully unclickable
            SwapMokeponBtn.addEventListener('click', () => {
                SwapMokeponButtonM()
                disableAllButtonsM(attackButtonsArrayM)
                if (currentMokepon.hp > 0) {
                    enableAllButtonsM(attackButtonsArrayM)
                }
                setTimeout(AIAttackSelectionM, 4000);
            })
        }
    }
}

// AI GAME LOGIC ///////////////////////////////////////////////////
// AI attack selection function
function AIAttackSelectionM() {
    if (AI_currentMokepon.hp < 0) {
        autoAiSwap()
    } else if (!isPlayerTurnM && (playerHPM > 0 && ai_HPM > 0) && currentMokepon != undefined) {
        const AIAttacksM = AI_currentMokepon.attacks;
        let opponentType = currentMokepon.type
        let randomIndex = Math.floor(Math.random() * AIAttacksM.length);
        let attackM = AIAttacksM[randomIndex];
        setTimeout(executeAIAttackMultiplayer(attackM, opponentType), 2500)
    }
}

// Execute attack selected for AI
function executeAIAttackMultiplayer(attackM, opponentType) {
    // Calculate damage multiplier based on AI attack type and player's selected Mokepon type
    let damageMultiplier = calculateDamageMultiplierM(attackM, opponentType);
    let damage = attackM.basePower * damageMultiplier;
    let randomFactor = Math.random() * (1.4 - 0.8) + 0.8;
    let damageRound = Math.floor(damage * randomFactor);

    currentMokepon.hp -= damageRound
    setTimeout(() => { checkGameOverM(); }, 4000)

    // show attack and damage information in context-info 
    let newContextInfoText = `Your oponents ${AI_currentMokepon.name} attacks with: ${attackM.name}!
    It deals ${damageRound} points of damage to your ${currentMokepon.name}!`;
    contextInfoElement.textContent = '';
    const characters = newContextInfoText.split('');
    for (let i = 0; i < characters.length; i++) {
        setTimeout(() => {
            contextInfoElement.textContent += characters[i];
        }, i * 25);
    }
    ai_AnimationM(attackM) // animate attack
    setTimeout(updateHPDOMElementM(playerHPM, 'you-status-hp'), 100);
    isPlayerTurnM = true;
}

// AI Animations when attacking 
function ai_AnimationM(attackM) {
    const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);
    const aiAttackImage = document.querySelector(`.ai-${attackM.type}-attack`)

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

    if (attackM.type != 'normal') {
        fadeInAndOutM(aiAttackImage);
    }
}

// function for auto swapping ai mokepon if downed
const AI_DOMHPMupdate = document.querySelector('.oponent-status-hp h3');

function autoAiSwap() {
    let aiSelectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);
    if ((AI_currentMokepon == AI_selectedMokepons[0])
        && (AI_currentMokepon.hp <= 0 && AI_selectedMokepons[1].hp > 0)) {

        let newContextInfoText = `Your oponents ${AI_currentMokepon.name} has been downed! 
        Your oponent calls in ${AI_selectedMokepons[1].name} to the fight!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');
        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);
        }
        aiSelectedImage.classList.remove('oponent');
        aiSelectedImage.style.display = 'none';
        AI_currentMokepon = AI_selectedMokepons[1]
        AI_DOMHPMupdate.textContent = AI_currentMokepon.hp; // update health
        aiMokeponElementM.textContent = AI_currentMokepon.name; // update name
        ai_HP_beforeM = AI_currentMokepon.hp;
        aiSelectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);
        aiSelectedImage.classList.add('oponent');
        aiSelectedImage.style.display = 'flex';
        isPlayerTurnM = true;

    } else if ((AI_currentMokepon == AI_selectedMokepons[1])
        && (AI_currentMokepon.hp <= 0 && AI_selectedMokepons[0].hp > 0)) {

        let newContextInfoText = `Your oponents ${AI_currentMokepon.name} has been downed! 
        Your oponent calls in ${AI_selectedMokepons[0].name} to the fight!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');
        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);
        }
        aiSelectedImage.classList.remove('oponent');
        aiSelectedImage.style.display = 'none';
        AI_currentMokepon = AI_selectedMokepons[0]
        AI_DOMHPMupdate.textContent = AI_currentMokepon.hp; // update health
        aiMokeponElementM.textContent = AI_currentMokepon.name; // update name
        ai_HP_beforeM = AI_currentMokepon.hp;
        aiSelectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);
        aiSelectedImage.classList.add('oponent');
        aiSelectedImage.style.display = 'flex';
        isPlayerTurnM = true;
    }
}

// Damage multiplier calculator depending on attack type and against what mokepon it is used
function calculateDamageMultiplierM(attackM, opponentType) {
    let typeChartValue = typeChart[attackM.type][opponentType]; // Get the damage multiplier value from the type chart
    return typeChartValue;
}

// Update hp number data each time the player or the AI takes damage
let ai_HP_beforeM = ai_HPM;
let player_HP_beforeM = playerHPM;
let damageDealtM = 0;

const playerDOMHPM = document.querySelector('.you-status-hp h3');
const AI_DOMHPM = document.querySelector('.oponent-status-hp h3');
const pDamageTakenM = document.querySelector('.you-damage-taken');
const aiDamageTakenM = document.querySelector('.oponent-damage-taken');

function updateHPDOMElementM() {
    currentMokepon.hp
    AI_currentMokepon.hp
    if (isPlayerTurnM) {
        damageDealtM = ai_HP_beforeM - AI_currentMokepon.hp;
        aiDamageTakenM.textContent = `-${damageDealtM}`;
        AI_DOMHPM.textContent = AI_currentMokepon.hp;
        fadeInAndOutM(aiDamageTakenM); // Apply fade-in and fade-out effect to AI damageDealt
        ai_HP_beforeM = AI_currentMokepon.hp; // Update ai_HP_before for the next turn
    } else {
        damageDealtM = player_HP_beforeM - currentMokepon.hp;
        pDamageTakenM.textContent = `-${damageDealtM}`;
        playerDOMHPM.textContent = currentMokepon.hp;
        fadeInAndOutM(pDamageTakenM); // Apply fade-in and fade-out effect to AI damageDealt
        player_HP_beforeM = currentMokepon.hp; // Update player_HP_before for the next turn
    }
};

// check player and AI hp to determine game status
function checkGameOverM() {
    forceplayerSwap()
    const endGameMenu = document.querySelector('.end-menu')
    const endMenuTitle = document.querySelector('.end-menu-title')
    const selectedImage = document.querySelector(`img[src="${currentMokepon.back_sprite}"]`);
    const ai_selectedImage = document.querySelector(`img[src="components/sprites/${AI_currentMokepon.name}.gif"]`);

    if (selectedMokepons[0].hp <= 0 && selectedMokepons[1].hp <= 0) {
        disableAllButtonsM(attackButtonsArrayM);
        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You loose!'
        selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        selectedImage.style.filter = "opacity(1)"
    } else if (AI_selectedMokepons[0].hp <= 0 && AI_selectedMokepons[1].hp <= 0) {
        disableAllButtonsM(attackButtonsArrayM);
        endGameMenu.style.display = 'flex'
        endMenuTitle.textContent = 'You Win!'
        ai_selectedImage.style.animation = `fadeOut 2s ease-in-out forwards`;
        ai_selectedImage.style.filter = "opacity(1)"
    }
}


const playerDOMHPMupdate = document.querySelector('.you-status-hp h3');

function SwapMokeponButtonM() {
    let selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
    if ((selectedMokepons[1].hp > 0)
        && (currentMokepon === selectedMokepons[0])) {

        let newContextInfoText = `Your ${currentMokepon.name} retreats! 
        You call in ${selectedMokepons[1].name} for help!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');
        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);
        }

        selectedImage.classList.remove('you');
        selectedImage.style.display = 'none';
        currentMokepon = selectedMokepons[1]
        playerDOMHPMupdate.textContent = currentMokepon.hp; // update health
        playerMokeponElementM.textContent = currentMokepon.name;
        player_HP_beforeM = currentMokepon.hp; // update name
        selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
        selectedImage.classList.add('you');
        selectedImage.style.display = 'flex';

    } else if ((selectedMokepons[0].hp > 0)
        && (currentMokepon === selectedMokepons[1])) {

        let newContextInfoText = `Your ${currentMokepon.name} retreats! You call in ${selectedMokepons[0].name} for help!`;
        contextInfoElement.textContent = '';
        const characters = newContextInfoText.split('');
        for (let i = 0; i < characters.length; i++) {
            setTimeout(() => {
                contextInfoElement.textContent += characters[i];
            }, i * 25);
        }

        selectedImage.classList.remove('you');
        selectedImage.style.display = 'none';
        currentMokepon = selectedMokepons[0]
        playerDOMHPMupdate.textContent = currentMokepon.hp; // update health
        playerMokeponElementM.textContent = currentMokepon.name;
        player_HP_beforeM = currentMokepon.hp; // update name
        selectedImage = document.querySelector(`img[src="components/sprites/${currentMokepon.name}-back.gif"]`);
        selectedImage.classList.add('you');
        selectedImage.style.display = 'flex';
    }
    isPlayerTurnM = false
}

function disableAllButtonsM(buttons) {
    for (const button of buttons) {
        SwapMokeponBtn.classList.add('disabled');
        SwapMokeponBtn.style.backgroundColor = '#808080'; //dark gray
        SwapMokeponBtn.disabled = true; // Make the button fully unclickable
        button.classList.add('disabled');
        button.style.backgroundColor = '#808080'; //dark gray
        button.disabled = true; // Make the button fully unclickable
    }
}

function enableAllButtonsM(buttons) {
    if (currentMokepon.hp > 0) {
        setTimeout(() => {
            for (const button of buttons) {
                button.classList.remove('disabled');
                if (currentMokepon != undefined) {
                    player_HP_beforeM = currentMokepon.hp
                    populateAttackButtonsM();
                    AttackButtonColorsM(); // Retrieve attack colors for buttons
                    SwapMokeponBtn.style.background = 'white'
                }
                button.disabled = false; // Make the button fully unclickable
                SwapMokeponBtn.disabled = false; // Make the button fully unclickable
            }
        }, 7000);// enable after seven seconds
    }
}

function fadeInAndOutM(element) {
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



// fix issue with if player and ai have the same mokepon sometimes the damage taken and given get mixed up and both end up getitng
// hp damage, i think is because they are both being saved to each corresponding array but using the same 
// instance of the mokepon object, check online to make sure