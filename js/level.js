const levelScreen = document.getElementById("level-screen");
const levelNum = document.getElementById("level-num");
const levelInfo = document.getElementById("info");
const levelCardsList = document.getElementById("cards-list");
const backArrowBtn = document.getElementById("back-arrow");

function displayLevel(level) {
    topicObj[level].forEach((el) => {
        createLevelCard(el.front)
    })
    
    switch(level) {
        case "levelOne":
            levelNum.textContent = "Level 1";
            break;
        case "levelTwo":
            levelNum.textContent = "Level 2";
            break;
        case "levelThree":
            levelNum.textContent = "Level 3";
            break;
        case "levelFour":
            levelNum.textContent = "Level 4";
            break;
        case "levelFive":
            levelNum.textContent = "Level 5";
            break;
        case "levelSix":
            levelNum.textContent = "Level 6";
            break;
        case "levelSeven":
            levelNum.textContent = "Level 7";
            break;
        case "finishedCards":
            levelNum.textContent = "Finished cards";
            break;
    }

    levelScreen.hidden = false;
}


function createLevelCard(front) {
    const card = document.createElement("div");
    card.className = "level-card";
    card.textContent = front;
    levelCardsList.append(card);
}

backArrowBtn.addEventListener("click", () => {
    levelScreen.hidden = true;
})