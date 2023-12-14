"use strict"

let selectedMokepons = [];

const mokeponButtonsMultiplayer = document.querySelectorAll('.mokepon-selection-button-multiplayer');

mokeponButtonsMultiplayer.forEach((button) => {
    button.addEventListener('click', () => {
        let mokeponName = button.id.split('-')[0];

        const indexOfMokepon = selectedMokepons.indexOf(mokeponName);
        if (indexOfMokepon !== -1) {
            // If the Mokepon is already in the array, remove it
            selectedMokepons.splice(indexOfMokepon, 1);
        } else {
            // If the Mokepon is not in the array, add it
            // Add the new Mokepon to the selected array
            selectedMokepons.push(mokeponName);

            // If the array is full, remove the oldest Mokepon from the array
            if (selectedMokepons.length === 3) {
                selectedMokepons.pop();
            }
        }

        // Log the selected Mokepon names to the console
        console.log(`Selected Mokepon (${selectedMokepons.length}): ${selectedMokepons}`);
    });
});

