const backToStartScreenBtn = document.getElementById("back-to-start-screen");
const deleteTopicBtn = document.getElementById("delete-topic");
const addNewCardBtn = document.getElementById("add-new-card");

const newCardScreen = document.getElementById("new-card-screen");
const topicTitleContainer = document.getElementById("topic-title");
const topicWeek = document.querySelectorAll(".day");
const cardsAmmountList = document.querySelectorAll(".cards-ammount");

const currentTopic = location.href.split('=')[1];
const topicObj = JSON.parse(localStorage.getItem(currentTopic));

// header events
backToStartScreenBtn.addEventListener("click", () => {
    location.href = "index.html";
})


function setTopicTitile() {
    document.title = `Topic | ${currentTopic}`;
    topicTitleContainer.textContent = currentTopic;
}


setTopicTitile();


function deleteTopic(title) {
    localStorage.removeItem(title);
    location.href = "index.html";
}

deleteTopicBtn.addEventListener("click", () => deleteTopic(currentTopic))

// week events
function displayWeek() {
  for (let d = 0; d < 7; d++) {
    if (topicObj.week[d] !== null) {
        // get all level nodes from day
        let levelsNodes = topicWeek[d].querySelectorAll(".level");
        for (let l = 0; l < topicObj.week[d].levelsList.length; l++) {
            // get num of level from list
            let lvl = topicObj.week[d].levelsList[l];
            // set opacity for node which index equal of num of level
            levelsNodes[lvl - 1].style.opacity = "100%";
        }
    }
  }
}

displayWeek();


function displayCurrentDay() {
    const toDay = new Date().getDay() - 1;
    topicWeek[toDay].querySelector(".test-state").style.backgroundColor = "purple";
}

displayCurrentDay();


// add card events
addNewCardBtn.addEventListener("click", () => {
    newCardScreen.classList.remove("outside");
})


// level events
function displayCardsAmmount(lvlsList) {
    cardsAmmountList.forEach((c, i) => {
        c.textContent = `${lvlsList[i].length} ${lvlsList[i].length === 1 ? "card" : "cards"}`;
    })
}

displayCardsAmmount(topicObj.lvlsList);