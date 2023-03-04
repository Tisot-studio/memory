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
})


// save
let levelOne = [];

class Card {
    constructor(f, b) {
        this.front = f;
        this.back = b;
    }
}

function addCardToLevel() {
    const newCard = new Card(f.textContent, b.textContent);
    levelOne.push(newCard);
    localStorage.setItem("levelOne", JSON.stringify(levelOne));
    f.textContent = '';
    b.textContent = '';
}


saveBtn.addEventListener("click", addCardToLevel);
