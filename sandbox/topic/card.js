const cancelBtn = document.getElementById("cancel");
const saveBtn = document.getElementById("save-btn");
const flipBtn = document.getElementById("flip-btn");

const flipCardInner = document.querySelector(".flip-card-inner");
const side = document.getElementById("side");
let f = document.querySelector(".front-content");
let b = document.querySelector(".back-content");
const flipCards = document.querySelectorAll(".flip-card");

let isFront = true;

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


function saveCard() {
    const newCard = new Card(f.textContent, b.textContent);
    topicObj.levelOne.push(newCard);
    topicObj.lvlsList[0] = topicObj.levelOne;
    localStorage.setItem(currentTopic, JSON.stringify(topicObj));
    f.textContent = '';
    b.textContent = '';
    flipCard();
}

saveBtn.addEventListener("click", saveCard);


// card footer events
function flipCard() {
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

