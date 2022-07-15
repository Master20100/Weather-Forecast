var citySearch = document.querySelector("#citySearch");

//moment api is used to get the current date with a specific format
//then use it to get the dates for the next 5 days.
var currentDate = moment().format('L');
var dayNumber = moment().format("D");
var cityName = "";

//this for loop is executed once the program runs to check if the local storage has any city name
//through looping over it, then any city name found would be used to create an input element
//of type button and add it to the city search form
for (let index = 0; index < localStorage.length; index++) {
    // <input type="button" value="Melborune">
    let cityHistory = document.createElement("input");
    cityHistory.type = "button";
    citySearch.append(cityHistory);
    cityHistory.value = localStorage.key(index);

}


//this function takes the api key, city, country code and limit results
//then would make a first fetch to get the longitude and a altitude of that city
//and then makes another fetch call to get the weather conditions for this city.
//Since the fetch call that gets the longtuide and altitude normally return the nearest city name
//to the city searched for, and since we don't want that to happen, I used a strict comparison
//to check if the returned city from api includes the city searched for otherwise it will alert the 
//user that city is not found
//if that matches, this will store that city as a key in the local storage so that it can
//be retrieved again
//the weather data returned will be used as a parameter in another fn called domWriter.

async function forecastDaily(apiKey, city, countryCode, limit) {
    var url1 = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "," + countryCode + "&limit=" + limit + "&appid=" + apiKey;
    var response1 = await fetch(url1);
    try {
        var data1 = await response1.json();
        if (data1[0].name.toLowerCase().includes(city.toLowerCase())) {
            if (localStorage.getItem(city.toLowerCase()) == null) {
                localStorage.setItem(city.toLowerCase(), "1");
                let cityHistory = document.createElement("input");
                cityHistory.type = "button";
                citySearch.append(cityHistory);
                cityHistory.value = city.toLowerCase();
            }
            let longLat = "lat=" + data1[0].lat + "&lon=" + data1[0].lon;
            var url2 = "https://api.openweathermap.org/data/2.5/onecall?" + longLat + "&exclude=minutely,hourly&units=metric&lang=en&appid=" + apiKey;
            var response2 = await fetch(url2);
            var data2 = await response2.json();
            domWriter(city, 6, data2);
        } else {
            alert("City not found, please try again");
        }

    }
    catch {
        alert("City not found, please try again");

    }
}


// dom writer fn will take the weather data for the specific city searched for then will
//put results in the current city and next days forecast

function domWriter(city, dayRange, weatherObject) {
    const today = document.querySelector("#currentCity");
    const nextDays = document.querySelector("#daysForecast");
    for (let index = 0; index < dayRange; index++) {

        if (index == 0) {
            today.children[0].innerHTML = city + " " + currentDate;
            today.children[1].src = "http://openweathermap.org/img/wn/" + weatherObject.daily[index].weather[0].icon + ".png";
            today.children[2].children[0].innerHTML = weatherObject.daily[0].temp.day;
            today.children[3].children[0].innerHTML = weatherObject.daily[0].humidity;
            today.children[4].children[0].innerHTML = weatherObject.daily[0].wind_speed;
            today.children[5].children[0].innerHTML = weatherObject.daily[0].uvi;
            today.children[5].children[0].style.backgroundColor = UVColor(weatherObject.daily[0].uvi);
        }
        else {
            nextDays.children[index - 1].children[0].children[0].innerHTML = moment().add(index + 1, 'days').format('L');
            nextDays.children[index - 1].children[1].src = "http://openweathermap.org/img/wn/" + weatherObject.daily[index].weather[0].icon + ".png";
            nextDays.children[index - 1].children[2].children[0].innerHTML = weatherObject.daily[index].temp.day;
            nextDays.children[index - 1].children[3].children[0].innerHTML = weatherObject.daily[index].humidity;
            nextDays.children[index - 1].children[4].children[0].innerHTML = weatherObject.daily[index].wind_speed;
            nextDays.children[index - 1].children[5].children[0].innerHTML = weatherObject.daily[index].uvi;
            nextDays.children[index - 1].children[5].children[0].style.backgroundColor = UVColor(weatherObject.daily[index].uvi);
        }
    }


}


// here, an event listener is attached form city search, and if is used to check if the search
//button is pressed, then will get the value from the input text above then run the forecast
//daily function . Otherwise, if type is button(the saved searches), this will get the value 
//from the button itself then run the forecast daily function 

var citySelectedValue = citySearch.addEventListener("click", function (event) {
    if (event.target.value == "Search") {
        cityName = document.getElementById("cityInpt").value;
        forecastDaily("7981694ef9c97bcfcb67516f35667455", cityName, "036", 1);


        return document.getElementById("cityInpt").value;
    }
    else if (event.target.type == "button") {
        cityName = event.target.value;
        forecastDaily("7981694ef9c97bcfcb67516f35667455", cityName, "036", 1);
        return event.target.value;
    }

});


//function the returns color depending on the UV index and can run on the uv data.
function UVColor(UVindex){
if(UVindex < 3){
    return "green"
}

else if (UVindex <  6){
    return "yellow"
}

else{
    return "red"
}
    


}