const closeTodayTstScrn = document.getElementById("close-today-test-screen");
const testCardContainer = document.querySelector(".today-test");
const numCardsForTest = document.getElementById("cards-for-test");
const correctBtn = document.getElementById("correct");
const incorrectBtn = document.getElementById("incorrect");

const td = new Date().getDay() - 1; //expect 0 for Monday
const tdL = topicObj.week[td].todayBoxes;
let cardsForTest = [];

// header events
closeTodayTstScrn.addEventListener("click", () => {
    todayScreen.classList.add("outside");
    location.reload();
})


function getCardsForTest() {
    const temp = [];    // array of arrays

    for (let i = 0; i < tdL.length; i++) {
        for (let c of Object.values(topicObj.boxesList[tdL[i]]))
            temp.push(c);
    }
    cardsForTest = temp.flat();
    cardsForTest.sort(() => Math.random() - 0.5);
    numCardsForTest.textContent = cardsForTest.length;
}

function flipTestCard() {
    const flipTestCardInner = document.querySelector(".flip-test-card-inner");
    const testCardSide = document.getElementById("test-card-side");
    if (isFront) {
        flipTestCardInner.classList.toggle("rotate");
        testCardSide.textContent = "Back";
        isFront = false;
    } else {
        flipTestCardInner.classList.toggle("rotate");
        testCardSide.textContent = "Front";
        isFront = true;
    }
}


function createTestCard() {
    const card = document.createElement("div");
    card.classList.add("flip-card", "test-flp-crd");
    card.addEventListener("click", flipTestCard);

    const flpCrdInnr = document.createElement("div");
    flpCrdInnr.classList.add("flip-card-inner", "flip-test-card-inner");

    const flpCrdFrnt = document.createElement("flip-card-front");
    flpCrdFrnt.className = "flip-card-front";

    const frntCntn = document.createElement("div");
    frntCntn.className = "front-content";
    frntCntn.textContent = cardsForTest[0].front;

    const flpCrdBck = document.createElement("div");
    flpCrdBck.className = "flip-card-back";

    const bckCntnt = document.createElement("div");
    bckCntnt.className = "back-content";
    bckCntnt.textContent = cardsForTest[0].back;

    
    // add all
    flpCrdBck.append(bckCntnt);
    flpCrdFrnt.append(frntCntn);
    flpCrdInnr.append(flpCrdFrnt, flpCrdBck);
    card.append(flpCrdInnr);
    testCardContainer.append(card);
}


// footer btns events
function correct(crd) {
    const cardForMove = document.querySelector(".test-flp-crd");
    crd.currentBox++;
    topicObj.boxesList[crd.currentBox][crd.front] = topicObj.boxesList[crd.currentBox - 1][crd.front];
    delete topicObj.boxesList[crd.currentBox - 1][crd.front];
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));

    cardForMove.classList.add("move-to-right");
    setTimeout(() => {
        cardForMove.remove();
    }, 1000);
    
    getCardsForTest();
    if (cardsForTest.length > 0) {
        createTestCard();
    } else {
        topicObj.week[td].isDone = true;
        localStorage.setItem(currentTopic, JSON.stringify(topicObj));
    }
}

function incorrect(crd) {
    const cardForMove = document.querySelector(".test-flp-crd");
    if (crd.currentBox !== 0) {
        topicObj.boxesList[0][crd.front] = topicObj.boxesList[crd.currentBox][crd.front];
        delete topicObj.boxesList[crd.currentBox][crd.front];
        crd.currentBox = 0;
    } else {
        delete topicObj.boxesList[0][crd.front];
        topicObj.boxesList[0][crd.front] = crd;
    }

    localStorage.setItem(currentTopic, JSON.stringify(topicObj));

    cardForMove.classList.add("move-to-right");
    setTimeout(() => {
        cardForMove.remove();
    }, 1000);
    
    getCardsForTest();
    if (cardsForTest.length > 0) {
        createTestCard();
    }
}


getCardsForTest();

if (cardsForTest.length > 0) {
    createTestCard();
} else {
    topicObj.week[td].isDone = true;
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));
}



correctBtn.addEventListener("click", () => correct(cardsForTest[0]));
incorrectBtn.addEventListener("click", () => incorrect(cardsForTest[0]));