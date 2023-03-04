import { Topic, displayTopicProgress} from "./topic.js";

const formContainer = document.getElementById("form");
const topicTitle = document.getElementById("title");
const topicsList = document.getElementById("topics-list");
// btns
const addNewBtn = document.getElementById("add-new-topic");
const createNewTopicBtn = document.getElementById("create-new-topic");


//functions
function createTopic() {
    const topic = new Topic(topicTitle.value);
    localStorage.setItem(topicTitle.value, JSON.stringify(topic));
    topicTitle.value = '';
    formContainer.classList.add("hidden");
    location.reload();
}


function createTopicListItem(title) {
    const container = document.createElement("div");
    container.className = "topic-item";
    container.addEventListener("click", () => displayTopicProgress(title));  
    container.textContent = title;
    topicsList.append(container);
}

// display topics from localStorage
for (let p of Object.keys(localStorage)) {
    createTopicListItem(p);
}

// events
addNewBtn.addEventListener("click", () => {
    formContainer.classList.toggle("hidden");
})

createNewTopicBtn.addEventListener("click", createTopic);