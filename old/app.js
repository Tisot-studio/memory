import {Topic, displayProgress} from "./topic.js";

// 86400000 - one day in millisec
const week = document.querySelectorAll(".day");
const cardsAmmountList = document.querySelectorAll(".cards-ammount");
const addTopicBtn = document.getElementById("add-new-topic");
const topicForm = document.querySelector(".form-container");
const topicTitle = document.getElementById("title");
const createTopicBtn = document.getElementById("create-new-topic");
const topicsList = document.getElementById("topics");
const startScreen = document.querySelector(".start-screen");

class Day {
    constructor(date, listOfLevels) {
        this.date = date;
        this.listOfLevels = listOfLevels;
        this.isDone = false;
    }
}

class Card {
    constructor(f, b) {
        this.front = f;
        this.back = b;
    }
}

// lvls
const levelOne = [];
const levelTwo = [];
const levelThree = [];
const levelFour = [];
const levelFive = [];
const levelSix = [];
const levelSeven = [];
const finishedCards = [];
const lvlsList = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven, finishedCards];

// функция запускаемая при старте изучения новой темы
function init() {
    const pivot = Date.now();       //день в миллисекундах
    const day = new Date().getDay() - 1;    //порядковый день недели

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
}

//функция настраивающая список уровней
function setLevels(pivot, date) {
    const levelsList = [];

    // посчитать кол-во дней прошедших с начала
    const numOfDays = Math.floor((date - pivot) / 86400000 + 1);

    // формируем список уровней
    if (numOfDays % 1 === 0) levelsList.push(1);
    if (numOfDays % 2 === 0) levelsList.push(2);
    if (numOfDays % 4 === 0) levelsList.push(3);
    if (numOfDays % 8 === 0) levelsList.push(4);
    if (numOfDays % 16 === 0) levelsList.push(5);
    if (numOfDays % 32 === 0) levelsList.push(6);
    if (numOfDays % 64 === 0) levelsList.push(7);

    return levelsList;
}


//функция подсвечивающая уровни в данном дне
function displayLevels(day, levelsList) {
    const colors = day.querySelectorAll(".level"); // day это нода - день недели, содержащий семь цветных кружков, формируем их список 

    // в этом цикле мы берем кружек порядковый номер которого соответсвтует номеру уровня и подсвечиваем его
    for (let i = 0; i < levelsList.length; i++) {
        colors[levelsList[i] - 1].style.opacity = "100%";
    }
}

// функция подсвечивающая текущий день
function displayCurrentDay(week) {
    const currentDay = Date.now();
    const day = new Date().getDay() - 1;

    if (week[day].day.date === currentDay) {
        week[day].querySelector(".state").style.backgroundColor = "purple";
    } 
}


// показать сколько карточек на уровне
function displayCardsAmmount() {
    cardsAmmountList.forEach((c, i) => {
        c.textContent = `${lvlsList[i].length} ${lvlsList[i].length === 1 ? "card" : "cards"}`;
    })
}

function updateCardAmmount() {
    localStorage.getItem()
}

init();
displayCurrentDay(week);
displayCardsAmmount();


// display topics
function createTopicListItem(title) {
    const container = document.createElement("div");
    container.className = "topic-title-container";
    container.addEventListener("click", () => displayProgress(title));  
    container.textContent = title;
    topicsList.append(container);
}

function createTopic() {
    const topic = new Topic(topicTitle.value);
    localStorage.setItem(topicTitle.value, JSON.stringify(topic));
    topicForm.classList.add("hidden");
    startScreen.classList.remove("hidden");
    location.reload();
}

addTopicBtn.addEventListener("click", () => {
    topicForm.classList.remove("hidden");
    startScreen.classList.add("hidden");
});

createTopicBtn.addEventListener("click", createTopic);


// display topics on main screen
for (let p of Object.keys(localStorage)) {
    createTopicListItem(p);
}
