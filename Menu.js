// second menu is shown when single player or multiplayer is shown
"use strict";
const singlePlayerButton = document.getElementById('singleplayer-btn');
const multiplayerButton = document.getElementById('multiplayer-btn');
const firstMenu = document.querySelector('.menu');
const secondMenu = document.querySelector('.second-menu');
const backButton = document.querySelector('.back-menu-button');
const nextButton = document.querySelector('.next-menu-button');
const youStatus = document.querySelector('.you-status');
const oponentStatus = document.querySelector('.oponent-status');
const bottomInfo = document.querySelector('.bottom-info');
const reloadButton = document.getElementById('main-menu-btn');

singlePlayerButton.addEventListener('click', () => {
    firstMenu.style.display = 'none';
    secondMenu.style.display = 'flex';
});

backButton.addEventListener('click', () => {
    firstMenu.style.display = 'flex';
    secondMenu.style.display = 'none';
    selectedButton.classList.remove('clicked')
})

reloadButton.addEventListener('click', () => {
    window.location.reload();
})


// multiplayerButton.addEventListener('click', () => {
//     console.log('button clicked');
//     firstMenu.style.display = 'none';
//     secondMenu.style.display = 'flex';
// });

// active state background color change for mokepon buttons


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

