var currentDate = moment().format('L');
var dayNumber = moment().format("D");
var x = "";

//here we get the forecast label days from 1 to 5 and assign each a date
for (var index = 0; index < daysForecast.children.length; index++) {
    // document.querySelector("#daysForecast").children[index].innerHTML = moment().format('L');   
    document.querySelector("#daysForecast").children[index].innerHTML = moment().add(index+1, 'days').format('L');
}

//m
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=m

async function forecastDaily(apiKey,city,countryCode,limit){
var url1 = "http://api.openweathermap.org/geo/1.0/direct?q="+city +","+countryCode+"&limit="+limit+"&appid="+apiKey;
console.log(url1);
var response1 =  await fetch(url1);
var data1 = await response1.json();
var longLat = "lat="+data1[0].lat+"&lon="+data1[0].lon;
var url2 = "https://api.openweathermap.org/data/2.5/onecall?"+longLat+"&exclude={part}&appid="+apiKey;
var response2  = await fetch(url2);
var data2 = await response2.json();
var temp = 
}


    forecastDaily("7981694ef9c97bcfcb67516f35667455","perth","036",1);
var citySearch = document.querySelector("#citySearch");
var citySelectedValue  = citySearch.addEventListener("click",function(event){
    if (event.target.value == "Search"){
        console.log(document.getElementById("cityInpt").value);
        return document.getElementById("cityInpt").value;
    }
    else if (event.target.value){
        console.log(event.target.value);
       return event.target.value;
    }

});

// https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}

