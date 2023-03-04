const newCard = document.querySelector(".new-card");
const addNewBtn = document.getElementById("add-new-btn");
const flipCardInner = document.querySelector(".main");
const flipBtn = document.getElementById("flip-btn");
const side = document.getElementById("side");
const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save-btn");
let f = document.querySelector(".front-content");
let b = document.querySelector(".back-content");
const flipCards = document.querySelectorAll(".flip-card");


class Card {
    constructor(f, b) {
        this.front = f;
        this.back = b;
    }
}


addNewBtn.addEventListener("click", () => {
    newCard.hidden = false;
})

// flip card
let isFront = true;

flipBtn.addEventListener("click", () => {
    if (isFront) {
        flipCardInner.classList.toggle("rotate");
        side.textContent = "Back";
        isFront = false;
    } else {
        flipCardInner.classList.toggle("rotate");
        side.textContent = "Front";
        isFront = true;
    } 
})


//cancel
cancelBtn.addEventListener("click", () => {
    newCard.hidden = true;
    location.reload();
})

function addCardToLevelOne() {
    const newCard = new Card(f.textContent, b.textContent);
    levelOne.push(newCard);
    lvlsList[0] = levelOne;
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));
    f.textContent = '';
    b.textContent = '';
}


saveBtn.addEventListener("click", addCardToLevelOne);
