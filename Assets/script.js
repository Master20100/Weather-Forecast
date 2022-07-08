var currentDate = moment().format('L');

var dayNumber = moment().format("D");
console.log(dayNumber);



for (var index = 0; index < daysForecast.children.length; index++) {
    document.querySelector("#daysForecast").children[index].innerHTML = moment().format('L');   
}