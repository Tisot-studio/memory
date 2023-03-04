// card
export class Card {
    constructor(front, back) {
        this.front = front;
        this.back = back;
    }
}


// day of the week
export class Day {
    constructor(date, listOfLevels, done) {
        this.date = date;
        this.listOfLevels = listOfLevels;
        this.done = done;
    }
}


// week
const week = [];


//levels
const level1 = {
    id: 1,
    listOfCards: []
};

const level2 = {
    id: 2,
    listOfCards: []
};

const level3 = {
    id: 3,
    listOfCards: []
};

const level4 = {
    id: 4,
    listOfCards: []
};

const level5 = {
    id: 5,
    listOfCards: []
};

const level6 = {
    id: 6,
    listOfCards: []
};

const level7 = {
    id: 7,
    listOfCards: []
};

const levelFinished = {
    id: 8,
    listOfCards: []
};