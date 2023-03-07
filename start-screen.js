const addNewBtn = document.getElementById("add-topic-btn");
const closeFromBtn = document.getElementById("close-form-screen");
const saveTopicBtn = document.getElementById("save-topic");
const formScreen = document.getElementById("form-screen-container");
const topicTitle = document.getElementById("topic-title");
const topicsList = document.getElementById("topics-list");

class Day {
    constructor(date) {
        this.date = date;
        this.todayBoxes = [0, ];
        this.isDone = false;
    }

// get num of level
    setLevelList(pivot) {
        const numOfDays = Math.floor((this.date - pivot) / 86400000 + 1);
        if (numOfDays % 2 === 0) this.todayBoxes.push(1);
        if (numOfDays % 4 === 0) this.todayBoxes.push(2);
        if (numOfDays % 8 === 0) this.todayBoxes.push(3);
        if (numOfDays % 16 === 0) this.todayBoxes.push(4);
        if (numOfDays % 32 === 0) this.todayBoxes.push(5);
        if (numOfDays % 64 === 0) this.todayBoxes.push(6);
    }
}

class Topic {
    constructor(title) {
        this.title = title;
        this.pivot = Date.now();
        this.week = [];
        this.boxesList = [{}, {}, {}, {}, {}, {}, {}, {}];
    }

    setStartWeek() {
        let dayOfTheWeek = new Date().getDay();
        for (let d = 1; d < 8; d++) {
            if (dayOfTheWeek > d) {
                this.week.push(null);
            } else {
                const day = new Day(this.pivot + 86400000 * (d - dayOfTheWeek));
                day.setLevelList(this.pivot);
                this.week.push(day);
            }
        }
    }

    updateWeek() {
        this.week = [];
        for (let d = 0; d < 7; d++) {
            const day = new Day(Date.now() + 86400000 * d);
            day.setLevelList(this.pivot);
            this.week.push(day);
        }
    }
}
// form events
addNewBtn.addEventListener("click", () => {
    formScreen.classList.remove("outside");
})

closeFromBtn.addEventListener("click", () => {
    formScreen.classList.add("outside");
})

function saveNewTopic() {
    if (topicTitle.value !== '') {
        const topic = new Topic(topicTitle.value);
        topic.setStartWeek();
        localStorage.setItem(topicTitle.value, JSON.stringify(topic));
    } else {
        const tpcs = [];    // ammount of topics in storage
        for (let t of Object.keys(localStorage)) {
            tpcs.push(t);
        }
        const newTopicTitle = `topic#${tpcs.length + 1}`;
        const topic = new Topic(newTopicTitle);
        topic.setStartWeek();
        localStorage.setItem(newTopicTitle, JSON.stringify(topic));
    }

    topicTitle.value = '';
    formScreen.classList.add("outside");
    location.reload();
}

saveTopicBtn.addEventListener("click", saveNewTopic);


// start screen events
function displayTopicProgress(title) {
    location.href = `topic.html?topic=${title}`;
}

function createTopicListItem(title) {
    const container = document.createElement("div");
    container.className = "topic-item";
    container.addEventListener("click", () => displayTopicProgress(title));  
    container.textContent = title;
    topicsList.append(container);
}

function displayAllTopics() {
    for (let t of Object.keys(localStorage)) {
        createTopicListItem(t);
    }
}

displayAllTopics();