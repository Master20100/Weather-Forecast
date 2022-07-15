Welcome to the weather forecast applicatiom

-the app consists of 3 functions.
a)the forecast daily fn
this function takes the api key, city, country code and limit results
then would make a first fetch to get the longitude and a altitude of that city
and then makes another fetch call to get the weather conditions for this city.
Since the fetch call that gets the longtuide and altitude normally return the nearest city name
to the city searched for, and since we don't want that to happen, I used a strict comparison
to check if the returned city from api includes the city searched for otherwise it will alert the 
user that city is not found
if that matches, this will store that city as a key in the local storage so that it can
be retrieved again
the weather data returned will be used as a parameter in another fn called domWriter.

b) the domwriter fn
dom writer fn will take the weather data for the specific city searched for then will
put results in the current city and next days forecast

c)function the returns color depending on the UV index and can run on the UV dataapp.



-An event listener is attached form city search, and if is used to check if the search
button is pressed, then will get the value from the input text above then run the forecast
daily function . Otherwise, if type is button(the saved searches), this will get the value 
from the button itself then run the forecast daily function 


-In dom structure of the app, grid is used for the main layout of the page to divide it to 7 columns, where the first 2 were used for the city search and the 5 other columns are used for the display of today and the next 5 days.
each of these 2 sections is in the form of a flexbox to be able to control how it is displayed


application photo
app_photo.png

