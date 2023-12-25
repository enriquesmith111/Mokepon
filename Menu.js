"use strict";
// SINGLE PLAYER MENU ELEMENTS AND GAME INFO
const singlePlayerButton = document.getElementById('singleplayer-btn');
const multiplayerButton = document.getElementById('multiplayer-btn');
const firstMenu = document.querySelector('.menu');
const secondMenu = document.querySelector('.second-menu');
const backButton = document.querySelector('.back-menu-button');
const nextButton = document.querySelector('.next-menu-button');
const youStatus = document.querySelector('.you-status');
const oponentStatus = document.querySelector('.oponent-status');
const bottomInfo = document.querySelector('.bottom-info');

// MULTIPLAYER PLAYER MENU ELEMENTS
const secondMenuMultiplayer = document.querySelector('.second-menu-multiplayer');
const backButtonMultiplayer = document.querySelector('.back-menu-button-multiplayer');
const nextButtonMultiplayer = document.querySelector('.next-menu-button-multiplayer');

// END GAME MENU ELEEMNTS
const reloadButton = document.getElementById('main-menu-btn');


// SINGLE PLAYER BUTTONS
singlePlayerButton.addEventListener('click', () => {
    firstMenu.style.display = 'none';
    secondMenu.style.display = 'flex';
});

backButton.addEventListener('click', () => {
    firstMenu.style.display = 'flex';
    secondMenu.style.display = 'none';
    if (selectedButton != null) {
        selectedButton.classList.remove('clicked')
    }
})

const buttons = document.querySelectorAll('.mokepon-selection-button');
let selectedButton = null;

for (const button of buttons) {
    button.addEventListener('click', () => {
        if (selectedButton !== null && selectedButton !== button) {
            selectedButton.classList.remove('clicked');
        }

        if (button.classList.contains('clicked')) {
            button.classList.remove('clicked');
            selectedButton = null;
        } else {
            button.classList.add('clicked');
            selectedButton = button;
        }
    });
};

// Add event listeners to Menu Mokepon buttons
const mokeponButtons = document.querySelectorAll('.mokepon-selection-button');
mokeponButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const mokeponName = button.id.split('-')[0];
        selectedMokepon = mokepons[mokeponName];
        console.log(selectedMokepon)
    });
});


// MULTIPLAYER MENU BUTTONS
multiplayerButton.addEventListener('click', () => {
    firstMenu.style.display = 'none';
    secondMenuMultiplayer.style.display = 'flex';
});

const multiplayerButtons = document.querySelectorAll('.mokepon-selection-button-multiplayer');
let selectedButtons = [];

multiplayerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (selectedButtons.length >= 2) {
            button.classList.remove('clicked-multiplayer');
            const indexToRemove = selectedButtons.indexOf(button);
            selectedButtons.splice(indexToRemove, 1);
        } else {
            const buttonClass = button.classList.contains('clicked-multiplayer') ? 'remove' : 'add';

            switch (buttonClass) {
                case 'add':
                    if (selectedButtons.length < 2) {
                        button.classList.add('clicked-multiplayer');
                        selectedButtons.push(button);
                    }
                    break;

                case 'remove':
                    button.classList.remove('clicked-multiplayer');
                    const indexToRemove = selectedButtons.indexOf(button);
                    selectedButtons.splice(indexToRemove, 1);
                    break;
            }
        }

        // Enable all buttons if selected buttons are less than 2
        if (selectedButtons.length < 2) {
            multiplayerButtons.forEach((otherButton) => {
                otherButton.disabled = false;
                nextButtonMultiplayer.disabled = true;
            });
        }

        // Check if two buttons are selected, disable the remaining buttons
        if (selectedButtons.length === 2) {
            multiplayerButtons.forEach((otherButton) => {
                if (!selectedButtons.includes(otherButton)) {
                    otherButton.disabled = true;
                    nextButtonMultiplayer.disabled = false;
                }
            });

        }
    });
});

// Add event listeners to Menu Mokepon buttons
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
    });
});

backButtonMultiplayer.addEventListener('click', () => {
    firstMenu.style.display = 'flex'; // Correct the spelling of "flex"
    secondMenuMultiplayer.style.display = 'none';
    selectedButtons.length = 0; // Initialize the selectedButtons array
});


// END MENU BUTTONS
reloadButton.addEventListener('click', () => {
    window.location.reload();
})
