const levelScreen = document.getElementById("level-screen");
const levelNum = document.getElementById("level-num");
const levelInfo = document.getElementById("info");
const levelCardsList = document.getElementById("cards-list");
const backToTopicScreenBtn = document.getElementById("back-to-topic-screen");

// card
const currentCardScreen = document.getElementById("current-card-screen");
const backToCardsListBtn = document.getElementById("back-to-cards-list");
const curCardSide = document.getElementById("current-card-side");
const deleteCardBtn = document.getElementById("delete-card");
const curCardFlipInner = document.getElementById("current-card-flip-inner");
const currentCardFront = document.getElementById("current-card-fr");
const currentCardBack = document.getElementById("current-card-back");
const flipCurCardBtn = document.getElementById("flip-current-card");

// current level data
let currentCard = undefined;
let currentLevel = '';
let indxLvlInList = 0;

function displayLevel(level) {
    topicObj[level].forEach((el) => {
        if (el !== null)
            createLevelCard(el);
    })
    switch(level) {
        case "levelOne":
            levelNum.textContent = "Level 1";
            break;
        case "levelTwo":
            levelNum.textContent = "Level 2";
            indxLvlInList = 1;
            break;
        case "levelThree":
            levelNum.textContent = "Level 3";
            indxLvlInList = 2;
            break;
        case "levelFour":
            levelNum.textContent = "Level 4";
            indxLvlInList = 3;
            break;
        case "levelFive":
            levelNum.textContent = "Level 5";
            indxLvlInList = 4;
            break;
        case "levelSix":
            levelNum.textContent = "Level 6";
            indxLvlInList = 5;
            break;
        case "levelSeven":
            levelNum.textContent = "Level 7";
            indxLvlInList = 6;
            break;
        case "finishedCards":
            levelNum.textContent = "Finished cards";
            indxLvlInList = 7;
            break;
    }

    currentLevel = level;
    levelScreen.classList.remove("level-screen-hidden");
}


function createLevelCard(el) {
    const card = document.createElement("div");
    card.className = "level-card";
    card.textContent = el.front;
    card.addEventListener("click", () => displayCard(el));
    levelCardsList.append(card);
}

function deleteLevelCards() {
    const crdList = document.querySelectorAll(".level-card");
    crdList.forEach(el => {
        el.remove();
    })
}

backToTopicScreenBtn.addEventListener("click", () => {
    levelScreen.classList.add("level-screen-hidden");
    displayCardsAmmount(topicObj.lvlsList);
    deleteLevelCards();
})

// card events
backToCardsListBtn.addEventListener("click", () => {
    currentCardScreen.classList.add("outside");
})

function displayCard(el) {
    currentCardScreen.classList.remove("outside");
    currentCardFront.textContent = el.front;
    currentCardBack.textContent = el.back;
    currentCard = el;
}

function flipCurrentCard() {
    if (isFront) {
        curCardFlipInner.classList.toggle("rotate");
        curCardSide.textContent = "Back";
        isFront = false;
    } else {
        curCardFlipInner.classList.toggle("rotate");
        curCardSide.textContent = "Front";
        isFront = true;
    }
}

flipCurCardBtn.addEventListener("click", flipCurrentCard);


function deleteCard() {
    const indx = topicObj[currentLevel].indexOf(currentCard);
    delete topicObj[currentLevel][indx];

// create new array without nulls
    topicObj[currentLevel].sort();
    for (let i = topicObj[currentLevel].length - 1; i >= 0; i--) {
        if (!topicObj[currentLevel][i])
            topicObj[currentLevel].pop();
        else
            break;
    }
// ===============
    topicObj.lvlsList[indxLvlInList] = topicObj[currentLevel];
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));
    currentCardScreen.classList.add("outside");
    deleteLevelCards();
    displayLevel(currentLevel);
}

deleteCardBtn.addEventListener("click", deleteCard);