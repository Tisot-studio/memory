// find all days
const week = document.querySelectorAll(".day");
// день инициализации темы
const PIVOT = Date.now();


// функция для распределения уровней по дням
function lvls(pivot, dayOfTheWeek) {
    let numsOfDays = (new Day.now() - pivot) / 86400000;
    let arr = [];

    if (numsOfDays % 1 == 0)
      arr.push(1);
    if (numsOfDays % 2 == 0)
      arr.push(2);
    if (numsOfDays % 3 == 0)
      arr.push(3);
    if (numsOfDays % 8 == 0)
      arr.push(4);
    if (numsOfDays % 16 == 0)
      arr.push(5);
    if (numsOfDays % 32 == 0)
      arr.push(6);
    if (numsOfDays % 64 == 0)
      arr.push(7);
  
    return arr;
}

const create = () => {
    const pivot = Date.now();
    const d = new Date().getDay();
    
    for (let i = 0; i < week.length; i++) {
        if (i === d) {
            week[d].querySelector(".state").style.backgroundColor = "purple";
            week[d].levelsList = [1];

            // подсвечиваем уровни в этом дне
            const lvls = week[d].querySelectorAll(".level");
                for (let i = 0; i < week[d].levelsList.length; i++) {
                    lvls[week[d].levelsList[i]-1].style.opacity = "100%";
                }
        }
        else 
            week[i].querySelector(".state").style.backgroundColor = "gray";
    }
}

create();


// функция считающая даты для предстоящей недели
function setDays(week) {
    const currentDay = Date.now();
    
    for (let i = 0; i < 7; i++) {
        week[i].date = currentDay + 86400000 * i;
    }
}

