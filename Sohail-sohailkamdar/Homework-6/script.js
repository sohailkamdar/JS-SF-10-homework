
'use strict';

const zip = document.querySelector('#zip-unlocked'); 
const tempPara = document.querySelector('#temp');
const locationPara = document.querySelector('#location');
let weatherUrl;
const apiKey = ''; // add your API key here
const appID = ''; // add app ID here
let city;
let state;
let lat;
let lon;
var temp;
const apiKey2 = '';
const zip2 = document.querySelector('#zip-open'); 


zip2.addEventListener('keyup', function() {
  const zipString = zip2.value; 
  if (zipString.length === 5) {
      getData(zipString);
  } 
}, false);


zip.addEventListener('keyup', function() {
  const zipString = zip.value; 
  if (zipString.length === 5) {
      getData(zipString);
  } 
}, false);

function getData(zip) {
  fetch('http://api.zippopotam.us/us/' + zip).then(function(response) {
    if (response.ok) {
      return response.json();
    } else {
      updateUIError();
    }
  }).then(function(data) {
    return getLocation(data);
  }).then(function(data){
    // if (zip2.value){
    //   return getweather2(data)
    // }else{
    //   return getWeather(data)
    // }
    return getWeather(data)
  }).then(function(data) {
    //why doesnt this come in BLURG
    return updateUISuccess(data);
  }).catch(function(error) {
    return updateUIError();
  });
}

function getLocation(data) {
  city = data.places[0]['place name'];
  state = data.places[0]['state'];
  lat = parseFloat(data.places[0].latitude).toFixed(2);
  lon = parseFloat(data.places[0].longitude).toFixed(2);
}

function updateUISuccess(data) {
  zip.value = '';
  locationPara.innerHTML = city + ', ' + state;
  console.log(data)
  tempPara.innerHTML = data
}

function updateUIError() {
  locationPara.innerHTML = 'Please try again in a bit.';
}

function getWeather(data){
  if (zip.value){
    weatherUrl = 'http://api.weatherunlocked.com/api/current/'+ lat+","+lon+'?app_id='+appID+'&app_key='+apiKey
  }else{
    weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+lon + apiKey2
  }
  fetch (weatherUrl).then(function(response){
    if (response.ok){
      return response.json()
    }
    else{
      console.log('not right');
    }
  }).then(function(data){
    temp = parseTemp(data)
    //It seems to get the temperature here! but not when I pass it into the next function.
    console.log(temp)
    return temp
  })
}

function parseTemp(weather){
    if (zip2.value){
      let minTemp = Math.floor((weather.main.temp_max - 273)* 1.8 + 32)
      let maxTemp = Math.floor((weather.main.temp_min - 273)* 1.8 + 32)
      temp = Math.floor((weather.main.temp - 273)* 1.8 + 32)
      $('#temp').html(temp +' Degrees Farenheit')
      return temp

    }
    else{
      temp = weather.temp_f
      $('#temp').html(temp+' Degrees Farenheit')
      return temp
    }
    
}




/*
 * Asynchronous JavaScript Exercise
 * 
 * This app fetches location information based on a zip code. You'll build
 * on this code to look up weather information based on the latitude and
 * longitude coordinates returned from your location search. 
 * 
 * STEP 1: Create a getWeather function that uses a Fetch request to return
 * data from the weatherunlocked API. Within the function, include a statement
 * to log the result to the console. (Note that this data will not be logged
 * until after you complete Step 2 below.)
 * 
 * STEP 2: Within the getData function, chain another .then() method after the
 * one that calls the getLocation function. Within this new .then() method,
 * return a function call to the getWeather function. Save your work, load
 * the app in the browser, and verify that weather data is logged to the
 * console from the getWeather function.
 * Hint: The getWeather() function must use a 'return' statement to return the 
 * result of the Fetch request.
 * 
 * STEP 3: Update the updateUISuccess function to do the following:
 * - Obtain the Fahrenheit temperature from the returned data.
 *   (Hint: Start by examining the data structure in the console that was
 *   logged in the previous step.)
 * - Update the element referenced by the tempPara variable with the
 *   temperature you obtained, the degree symbol, and the letter F (for
 *   Fahrenheit)
 * 
 * STEP 4: Test your app and verify that for any 5-digit zip code you type
 * in the input box, the UI updates with city, state, and current temperature.
 * 
 * BONUS: Write a getWeather2 function to makea request to openweathermap.org.
 * Incorporate a call to this function into the getData function. In the
 * updateUISuccess function, average the temperatures returned from the two
 * weather APIs and display the average in the browser window.
 * 
 * BONUS 2: Combine the getWeather and getWeather2 functions into a single
 * function that can accept the necessary parameters to make an API call to
 * either weatherunlocked or openweathermap. Be sure to update your function
 * calles in the getData function to reference the new function with the 
 * appropriate name and arguments. 
 */ 
