const week = document.querySelectorAll(".day");
const cardsAmmountList = document.querySelectorAll(".cards-ammount");
const backToMainScreenBtn = document.getElementById("back-to-main-screen");
const topicTitle = document.getElementById("topic-title");

class Day {
    constructor(date, listOfLevels) {
        this.date = date;
        this.listOfLevels = listOfLevels;
        this.isDone = false;
    }
}

const url = location.href;
const currentTopic = url.split('=')[1];
document.title = `Topic | ${currentTopic}`;
topicTitle.textContent = currentTopic;
const topicObj = JSON.parse(localStorage.getItem(currentTopic));
const {
    pivot, 
    lvlsList, 
    levelOne, 
    levelTwo, 
    levelThree, 
    levelFour, 
    levelSix, 
    levelSeven, 
    finishedCards 
} = topicObj;


function setLevels(pivot, date) {
    const levelsList = [];
    const numOfDays = Math.floor((date - pivot) / 86400000 + 1);
    if (numOfDays % 1 === 0) levelsList.push(1);
    if (numOfDays % 2 === 0) levelsList.push(2);
    if (numOfDays % 4 === 0) levelsList.push(3);
    if (numOfDays % 8 === 0) levelsList.push(4);
    if (numOfDays % 16 === 0) levelsList.push(5);
    if (numOfDays % 32 === 0) levelsList.push(6);
    if (numOfDays % 64 === 0) levelsList.push(7);

    return levelsList;
}



function displayLevels(day, levelsList) {
    const colors = day.querySelectorAll(".level"); 

    for (let i = 0; i < levelsList.length; i++) {
        colors[levelsList[i] - 1].style.opacity = "100%";
    }
}


function displayCurrentDay(week) {
    const day = new Date().getDay() - 1;
    week[day].querySelector(".state").style.backgroundColor = "purple";

}


// показать сколько карточек на уровне
function displayCardsAmmount(lvlsList) {
    cardsAmmountList.forEach((c, i) => {
        c.textContent = `${lvlsList[i].length} ${lvlsList[i].length === 1 ? "card" : "cards"}`;
    })
}

function displayData() {
    const day = new Date().getDay() - 1;    

    for (let i = 0; i < 7; i++) {
        if (i < day) {
            week[i].day = null;
        } else if (i === day) {
            const d = new Day(pivot, [1]);
            week[i].day = d;
            displayLevels(week[i], [1]);
        } else {
            const currentDate = pivot + 86400000 * (i - day);
            const d = new Day(currentDate, setLevels(pivot, currentDate));
            week[i].day = d;
            displayLevels(week[i], setLevels(pivot, currentDate));
        }
    }
    displayCardsAmmount(lvlsList);
    displayCurrentDay(week);
}


displayData();


backToMainScreenBtn.addEventListener("click", () => {
    location.href = "index.html";
})
