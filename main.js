let redProgress = 0;
let greenProgress = 0;
let upgradeCost = 3;
let fillRate = 1;
let counter = 0;
let specialPoints = 0;
let questsCompleted = {1: false, 2: false, 3: false};

function redeemQuest(questNumber, counterRequirement) {
    if (counter >= counterRequirement && !questsCompleted[questNumber]) {
        specialPoints += 1; // Award 1 SP
        questsCompleted[questNumber] = true; // Mark quest as completed
        document.getElementById("specialPoints").textContent = specialPoints; // Update SP display
        alert(`Quest ${questNumber} completed! You earned 1 SP.`);
        // Optionally, disable the redeem button for this quest
        event.target.disabled = true;
    } else {
        alert(`Quest ${questNumber} not completed or already redeemed.`);
    }
}

// Example redemption check. You might want to call this in a function that updates the counter.
function checkQuests() {
    Object.keys(questsCompleted).forEach(questNumber => {
        if (counter >= quests[questNumber] && !questsCompleted[questNumber]) {
            // Enable the button for redeeming this quest
            document.querySelector(`#quest${questNumber} button`).disabled = false;
        }
    });
}

document.body.onkeydown = function(e) {
    if (e.keyCode === 32) { // Spacebar pressed
        increaseRedProgress();
    }
};

function increaseRedProgress() {
    redProgress += fillRate;
    if (redProgress >= 100) {
        redProgress = 0; // Reset red progress
        counter++; // Increase counter
        increaseGreenProgress(); // Increment green progress bar
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
    progressBar.style.width = `${progress}%`; // Set width using the actual progress value
    progressBar.textContent = `${Math.floor(progress)}%`; // Display rounded down number
}
document.getElementById('upgradeButton').onclick = function() {
    const messageElement = document.getElementById('message');
    if (counter >= upgradeCost) {
        counter -= upgradeCost; // Deduct the cost
        fillRate += .5; // Increase fill rate
        upgradeCost = Math.ceil(upgradeCost + 2 + upgradeCost * 0.5); // Calculate new cost
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

