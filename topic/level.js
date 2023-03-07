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

    for (let c of Object.values(topicObj.boxesList[level])) {
        createLevelCard(c);
    }
        
    switch(level) {
        case 0:
            levelNum.textContent = "Level 1";
            break;
        case 1:
            levelNum.textContent = "Level 2";
            indxLvlInList = 1;
            break;
        case 2:
            levelNum.textContent = "Level 3";
            indxLvlInList = 2;
            break;
        case 3:
            levelNum.textContent = "Level 4";
            indxLvlInList = 3;
            break;
        case 4:
            levelNum.textContent = "Level 5";
            indxLvlInList = 4;
            break;
        case 5:
            levelNum.textContent = "Level 6";
            indxLvlInList = 5;
            break;
        case 6:
            levelNum.textContent = "Level 7";
            indxLvlInList = 6;
            break;
        case 7:
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
    displayCardsAmmount(topicObj.boxesList);
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
    currentCard = el.front;
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
    delete topicObj.boxesList[currentLevel][currentCard];
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));
    currentCardScreen.classList.add("outside");
    deleteLevelCards();
    displayLevel(currentLevel);
}

deleteCardBtn.addEventListener("click", deleteCard);