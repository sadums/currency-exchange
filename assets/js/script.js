convertBtn.addEventListener('click', (event)=> {
  event.preventDefault()
  const form = document.getElementById('form');
  const convertBtn = document.getElementById('convertBtn');
  var input = document.getElementById('input');
  var currencyTo = document.getElementById('currencyTo').value;
  var currencyFrom = document.getElementById('currencyFrom').value;
  var amount = (input.value);
  var requestURL = `https://api.apilayer.com/fixer/convert?to=${currencyTo}&from=${currencyFrom}&amount=${amount}`;
  var myHeaders = new Headers();

  myHeaders.append("apikey", "YJtlkQDlPUG4dvDBd01umEs1dtIkBCan");

  var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

   var getCurrency = function(){

    fetch(requestURL, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
    getCurrency() 
   })




/* GENERATE MAP DIV */
var mapOptions = {
  center:[40.5086, -112.0125], //Where map will start
  zoom:10
}
var map = new L.map('map', mapOptions);
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);


/* PLACES API CALL */
var limit = 20; //Limits Results
var search = "Credit Union";
var lat = 40.5086; //where to search from
var lon = -112.0125;
var radius = 20000;

var placesRequestURL = `https://api.tomtom.com/search/2/search/${search}.json?key=gzfilgZ8uJFWF9BCQHsE4daKJN4bToA9&limit=${limit}&lat=${lat}&lon=${lon}&radius=${radius}`;


var getPlaces = function(){
  fetch(placesRequestURL)
  .then(response => response.json())
  // Function for operating with result
  .then(function(result){
    console.log(result.results.length);
    for(var i = 0; i < result.results.length; i++){
      console.log(result.results[i].position.lat);
      console.log(result.results[i].position.lon)
      var marker = new L.Marker([result.results[i].position.lat, result.results[i].position.lon]);
      marker.addTo(map);
    }
    console.log(result);
  })
  .catch(error => console.log('error', error));
}