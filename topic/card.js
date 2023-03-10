const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save-btn");
const flipBtn = document.getElementById("flip-btn");

// static html
const side = document.getElementById("side");
const inputWrapper = document.querySelector(".new-card");

let isFront = true;
let counter = 0;

class Card {
    constructor(f, b) {
        this.currentBox = 0;
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
    const flipCardInner = document.querySelector(".flip-inner-new-card");
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
function createCard(container = inputWrapper) {
    const card = document.createElement("div");
    card.classList.add("flip-card", "flip-new-card");

    const flpCrdInnr = document.createElement("div");
    flpCrdInnr.classList.add("flip-card-inner", "flip-inner-new-card");

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
    container.append(card);

    counter++;
}


function saveCard() {
    const cardForMove = document.querySelector(".flip-new-card");
    let f = document.querySelector(".front-content");
    let b = document.querySelector(".back-content");

    const newCard = new Card(f.textContent, b.textContent);
    topicObj.boxesList[0][f.textContent] = newCard;
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