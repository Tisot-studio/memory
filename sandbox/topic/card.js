const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save-btn");
const flipBtn = document.getElementById("flip-btn");

// static html
const side = document.getElementById("side");
const inputWrapper = document.querySelector(".input-wrapper");

let isFront = true;
let counter = 0;

class Card {
    constructor(f, b) {
        this.front = f;
        this.back = b;
    }
}

// card header events
cancelBtn.addEventListener("click", () => {
    newCardScreen.classList.add("outside");
    location.reload();
})


// card footer events
function flipCard() {
    const flipCardInner = document.querySelector(".flip-card-inner");
    if (isFront) {
        flipCardInner.classList.toggle("rotate");
        side.textContent = "Back";
        isFront = false;
    } else {
        flipCardInner.classList.toggle("rotate");
        side.textContent = "Front";
        isFront = true;
    }
}

flipBtn.addEventListener("click", flipCard);


// cards animation
function createCard() {
    const card = document.createElement("div");
    card.className = "flip-card";

    const flpCrdInnr = document.createElement("div");
    flpCrdInnr.className = "flip-card-inner";

    const flpCrdFrnt = document.createElement("flip-card-front");
    flpCrdFrnt.className = "flip-card-front";

    const frntCntn = document.createElement("div");
    frntCntn.className = "front-content";
    frntCntn.setAttribute("contenteditable", "true");

    const flpCrdBck = document.createElement("div");
    flpCrdBck.className = "flip-card-back";

    const bckCntnt = document.createElement("div");
    bckCntnt.className = "back-content";
    bckCntnt.setAttribute("contenteditable", "true");
    
    // add all
    flpCrdBck.append(bckCntnt);
    flpCrdFrnt.append(frntCntn);
    flpCrdInnr.append(flpCrdFrnt, flpCrdBck);
    card.append(flpCrdInnr);
    inputWrapper.append(card);

    counter++;
}


function saveCard() {
    const cardForMove = document.querySelector(".flip-card");
    let f = document.querySelector(".front-content");
    let b = document.querySelector(".back-content");

    const newCard = new Card(f.textContent, b.textContent);
    topicObj.levelOne.push(newCard);
    topicObj.lvlsList[0] = topicObj.levelOne;
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));

// move card to right and create new
    if (counter !== 0) {
        cardForMove.classList.add("move-to-right");
        setTimeout(() => {
            cardForMove.remove();
        }, 1000);
        }
    createCard();
    flipCard();
}

saveBtn.addEventListener("click", saveCard);

createCard();