const backToStartScreenBtn = document.getElementById("back-to-start-screen");
const deleteTopicBtn = document.getElementById("delete-topic");
const addNewCardBtn = document.getElementById("add-new-card");
const todayTestBtn = document.getElementById("today-test");

const newCardScreen = document.getElementById("new-card-screen");
const topicTitleContainer = document.getElementById("topic-title");
const topicWeek = document.querySelectorAll(".day");
const cardsAmmountList = document.querySelectorAll(".cards-ammount");
const todayScreen = document.getElementById("today-test-screen");
const toDayTestContainer = document.querySelector(".today-test");

const currentTopic = location.href.split('=')[1];
const topicObj = JSON.parse(localStorage.getItem(currentTopic));

let toDay = new Date().getDay() - 1;


// ================================================================
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


// ============================================================================
// week events
function displayWeek() {
  for (let d = 0; d < 7; d++) {
    if (topicObj.week[d] !== null) {
        // get all level nodes from day
        let levelsNodes = topicWeek[d].querySelectorAll(".level");
        for (let l = 0; l < topicObj.week[d].todayBoxes.length; l++) {
            // get num of level from list
            let lvl = topicObj.week[d].todayBoxes[l];
            // set opacity for node which index equal of num of level
            levelsNodes[lvl].style.opacity = "100%";
        }
    }
  }
}

displayWeek();


function displayCurrentDay() {
    if (toDay === -1) {
        toDay = 6;
    }
    const currentDay =  topicWeek[toDay];
    if (topicObj.week[toDay].isDone) {
        currentDay.querySelector(".test-state").style.backgroundColor = "green";
    } else {
        currentDay.querySelector(".test-state").style.backgroundColor = "purple";
    }
    
}

displayCurrentDay();



// ===============================================================================
// add card events
addNewCardBtn.addEventListener("click", () => {
    newCardScreen.classList.remove("outside");
})


// ===============================================================================
// level events
function countCardsInBox(box) {
    let count = 0;
    for (let key in box) {
        count++;
    }
    return count;
}

function displayCardsAmmount(bxLs) {
    cardsAmmountList.forEach((c, i) => {
        c.textContent = `${countCardsInBox(bxLs[i])} ${countCardsInBox(bxLs[i]) === 1 ? "card" : "cards"}`;
    })
}

displayCardsAmmount(topicObj.boxesList);


//=================================================================================
// footer events
todayTestBtn.addEventListener("click", () => {
    todayScreen.classList.remove("outside");
})

if (topicObj.week[toDay].isDone) {
    todayTestBtn.style.color = "grey";
    todayTestBtn.disabled = true;
}

// update week on Monday
// function updateWeekOnModay() {
//     const d = new Date().getDay() - 1;
//     if (d === 0) {
//         topicObj.updateWeek();
//     }

//     console.log(topicObj.week)
// }

// if (new Date(topicObj.pivot).getDate() !== new Date().getDate()) {
//     updateWeekOnModay();
// }
