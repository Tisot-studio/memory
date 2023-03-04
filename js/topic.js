export class Topic {
        constructor(title) {
            this.title = title;
            this.pivot = Date.now();
            this.levelOne = [];
            this.levelTwo = [];
            this.levelThree = [];
            this.levelFour = [];
            this.levelFive = [];
            this.levelSix = [];
            this.levelSeven = [];
            this.finishedCards = [];
            this.lvlsList = [
                this.levelOne, 
                this.levelTwo, 
                this.levelThree, 
                this.levelFour, 
                this.levelFive, 
                this.levelSix, 
                this.levelSeven, 
                this.finishedCards
            ];
        }
    }

export function displayTopicProgress(title) {
    location.href = `topic.html?topic=${title}`;
}