let redProgress = 0;
let greenProgress = 0;
let upgradeCost = 3;
let fillRate = 1;
let counter = 0;
let currentQuestNumber = 1;
let questRequirements = [100, 3319, 110157];
let specialPoints = 0;
let TC = 0
let TSP = 0
let RedReq = 100
let CIA = 1 

document.getElementById('counter').textContent = counter;

function updateQuestDisplay() {
    if (currentQuestNumber > questRequirements.length) {
        // No more quests available
        document.getElementById("currentQuest").style.display = "none";
        return;
    }
    
    let questRequirement = questRequirements[currentQuestNumber - 1];
    document.getElementById("questDescription").textContent = `Quest ${currentQuestNumber}: Collect ${questRequirement} counters`;
    document.getElementById("questButton").onclick = function() { redeemQuest(currentQuestNumber, questRequirement); };
}

function redeemQuest(questNumber, counterRequirement) {
    if (counter >= counterRequirement) {
        specialPoints += 1; // Award 1 SP
        TSP += 1;
        document.getElementById("specialPoints").textContent = specialPoints; // Update SP display
        alert(`Quest ${questNumber} completed! You earned 1 SP.`);
        currentQuestNumber += 1; // Move to the next quest
        updateQuestDisplay(); // Update the quest display
    } else {
        alert(`Quest ${questNumber} not completed.`);
    }
}

updateQuestDisplay();

document.body.onkeydown = function(e) {
    if (e.keyCode === 32) { // Spacebar pressed
        increaseRedProgress();
        saveGame();
    }
};

function increaseRedProgress() {
    redProgress += fillRate;
    if (redProgress >= RedReq) {
        redProgress = 0; // Reset red progress
        TC += 1;
        counter += CIA;
        checkAchievements();
        increaseGreenProgress();
        showGreenProgressBar();
    }
    updateProgressBar('redProgressBar', redProgress);
    document.getElementById('counter').textContent = counter; // Update counter display
}

function increaseGreenProgress() {
    greenProgress += 1; // Increment green progress by 1%
    if (greenProgress > 100) greenProgress = 100; // Cap green progress at 100%
    updateProgressBar('greenProgressBar', greenProgress);
}

function updateProgressBar(barId, progress) {
    const progressBar = document.getElementById(barId);
    const adjustedProgress = progress * CIA; // Multiply progress by CIA
    progressBar.style.width = `${adjustedProgress}%`; // Set width using the adjusted progress value
    progressBar.textContent = `${Math.floor(progress)}%`; // Display rounded down number of original progress
}

document.getElementById('upgradeButton').onclick = function() {
    const messageElement = document.getElementById('message');
    if (counter >= upgradeCost) {
        counter -= upgradeCost; // Deduct the cost
        fillRate += .5; // Increase fill rate
        upgradeCost = Math.ceil(upgradeCost + 2 + upgradeCost * 0.1); // Calculate new cost
        document.getElementById('counter').textContent = counter; // Update counter display
        document.getElementById('upgradeCost').textContent = upgradeCost; // Update upgrade cost display
        if (messageElement) messageElement.remove(); // Remove the message if it exists
    } else {
        if (!messageElement) {
            const notEnoughMessage = document.createElement('p');
            notEnoughMessage.textContent = "Not enough!";
            notEnoughMessage.id = 'message';
            notEnoughMessage.style.color = 'red';
            document.body.appendChild(notEnoughMessage);
        }
    }
};

document.getElementById("statsButton").addEventListener("click", function() {
    var statsSection = document.getElementById("statsSection");
    if (statsSection.style.display === "none") {
        statsSection.style.display = "block";
        updateStats(); // Call this function to update stats whenever the stats section is opened
    } else {
        statsSection.style.display = "none";
    }
});

function updateStats() {
    document.getElementById("totalCounterDisplay").textContent = TC; // Update total counters in stats
    document.getElementById("totalSPDisplay").textContent = TSP; // Assume 'specialPoints' holds the total SP value
}

let purchasedUpgrades = {
    doubleCounter: false,
    increaseFillRate: false,
    halfProgress: false
};

function buyUpgrade(upgradeType) {
    const upgradeCosts = {
        doubleCounter: 1,
        increaseFillRate: 1,
        halfProgress: 1
    };
    
    if (specialPoints >= upgradeCosts[upgradeType] && !purchasedUpgrades[upgradeType]) {
        specialPoints -= upgradeCosts[upgradeType]; // Deduct the cost
        purchasedUpgrades[upgradeType] = true; // Mark as purchased
        applyUpgradeEffect(upgradeType); // Apply the upgrade effect
        document.getElementById("specialPoints").textContent = specialPoints; // Update SP display
        alert("Upgrade purchased successfully!");
    } else if (purchasedUpgrades[upgradeType]) {
        alert("This upgrade has already been purchased.");
    } else {
        alert("Not enough Special Points.");
    }
}

function applyUpgradeEffect(upgradeType) {
    switch (upgradeType) {
        case 'doubleCounter':
            CIA += 1
            
            break;
        case 'increaseFillRate':
            // Logic to increase fill rate by 0.05 per achievement (Adjust fillRate variable accordingly)
            fillRate += 0.05;
            break;
        case 'halfProgress':
            RedReq = 50
            
            break;
    }
}

function showGreenProgressBar() {
    var greenProgressContainer = document.getElementById('greenProgressContainer');
    greenProgressContainer.style.opacity = 1; // Make it fully opaque
    greenProgressContainer.style.visibility = 'visible'; // Change visibility to visible
}


const achievements = [
    { id: 1, name: "First Steps", requirement: 15, unlocked: false },
    { id: 2, name: "Getting There", requirement: 30, unlocked: false },
    // Add more achievements as needed
];

// Check for achievements whenever TC is updated
function checkAchievements() {
    achievements.forEach(achievement => {
        if (TC >= achievement.requirement && !achievement.unlocked) {
            achievement.unlocked = true;
            showAchievementPopup(achievement.name);
            updateAchievementsMenu();
            // Optionally save achievements state to localStorage
        }
    });
}

function showAchievementPopup(name) {
    const popup = document.getElementById("achievementPopup");
    popup.textContent = `Achievement Unlocked: ${name}`;
    popup.style.display = "block";
    setTimeout(() => { popup.style.display = "none"; }, 5000); // Hide after 5 seconds
}

function updateAchievementsMenu() {
    const list = document.getElementById("achievementsList");
    list.innerHTML = ''; // Clear current list
    achievements.forEach(achievement => {
        const item = document.createElement("div");
        item.textContent = achievement.name + (achievement.unlocked ? " - Unlocked" : " - Locked");
        item.style.color = "#000"; // Explicitly set text color if necessary
        list.appendChild(item);
    });
}

// Call this function to initially populate the achievements list
document.addEventListener('DOMContentLoaded', updateAchievementsMenu);

// Example of calling checkAchievements (you'd call this when TC updates)
// checkAchievements();

