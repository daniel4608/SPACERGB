// Function to save the game state
function saveGame() {
    const gameData = {
        redProgress: redProgress,
        greenProgress: greenProgress,
        upgradeCost: upgradeCost,
        fillRate: fillRate,
        counter: counter,
        currentQuestNumber: currentQuestNumber,
        questRequirements: questRequirements,
        specialPoints: specialPoints,
        TC: TC, // Total Counters
        TSP: TSP // Total Special Points
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Function to load the game state
function loadGame() {
    const savedGameData = localStorage.getItem('gameData');
    if (savedGameData) {
        const gameData = JSON.parse(savedGameData);
        redProgress = gameData.redProgress;
        greenProgress = gameData.greenProgress;
        upgradeCost = gameData.upgradeCost;
        fillRate = gameData.fillRate;
        counter = gameData.counter;
        currentQuestNumber = gameData.currentQuestNumber;
        questRequirements = gameData.questRequirements;
        specialPoints = gameData.specialPoints;
        TC = gameData.TC; // Restore Total Counters
        TSP = gameData.TSP; // Restore Total Special Points

        // Update UI elements as necessary based on loaded data
        // Example: Update displays for counter, SP, etc.
        updateUI(); // This should be a function you define to refresh your game's UI based on the loaded state
    }
}

// Add an event listener to automatically load the game state when the page loads
window.addEventListener('load', loadGame);
