var input = document.getElementById('input');
var output = document.getElementById('output');
var currencyTo = document.getElementById('currencyTo');
var currencyFrom = document.getElementById('currencyFrom');
var rate = 0;
var rateSelected = false;

var myHeaders = new Headers();
myHeaders.append("apikey", "rpfEgYQA7e6eroLVSbgIXY5IZDrWs9sb");

var callCurrencyAPI = function(){
  var to = currencyTo.value.split("-")[0];
  var from = currencyFrom.value.split("-")[0];
  if(!rateSelected){
    console.log(localStorage.getItem('currencyToValue'));
    console.log(localStorage.getItem('currencyFromValue'));
    if(localStorage.getItem('currencyToValue') != null || localStorage.getItem('currencyToValue') != undefined){
      to = localStorage.getItem('currencyToValue').split("-")[0];
      currencyTo.value = localStorage.getItem('currencyToValue');
    }
    if(localStorage.getItem('currencyFromValue') != null || localStorage.getItem('currencyFromValue') != undefined){
      from = localStorage.getItem('currencyFromValue').split("-")[0];
      currencyFrom.value = localStorage.getItem('currencyFromValue');
    }
  }
  var requestURL = `https://api.apilayer.com/fixer/convert?to=${to}&from=${from}&amount=5`;
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  fetch(requestURL, requestOptions)
  .then(response => response.json())
  .then(function(result){
    console.log(result);
    rate = result.info.rate;
    inputConvert();
    outputConvert();
  })
  .catch(error => console.log('error', error));
}
callCurrencyAPI();

function inputConvert(event){  
  var number = input.value
  output.value = Math.round(((+number * rate) + Number.EPSILON) * 100) / 100;
}

function outputConvert(event){
  var number = output.value
  input.value = Math.round(((+number / rate)+ Number.EPSILON) * 100) / 100;
}
input.addEventListener("keyup", inputConvert);
output.addEventListener("keyup", outputConvert);

currencyTo.onchange = function(){
  callCurrencyAPI();
  rateSelected = true;
  localStorage.setItem('currencyToValue', currencyTo.value);
}
currencyFrom.onchange = function(){
  callCurrencyAPI();
  rateSelected = true;
  localStorage.setItem('currencyFromValue', currencyFrom.value);
}



/* GENERATE MAP DIV */ 
var map;
var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var showMap = function(lat, lon){
  var mapOptions = {
    center:[lat, lon], //Where map will start
    zoom:14 // map zoom
  }
  map = new L.map('map').setView(mapOptions.center, mapOptions.zoom);
  map.addLayer(layer);
  getPlaces(lat, lon);
}


/* GENERATE MARKERS */
var bankData = new Map();
var getPlaces = function(lat, lon){
  // query criteria
  var search = "Bank";
  var limit = 20;
  var radius = 20000;
  // query
  var placesRequestURL = `https://api.tomtom.com/search/2/categorySearch/${search}.json?key=gzfilgZ8uJFWF9BCQHsE4daKJN4bToA9&limit=${limit}&lat=${lat}&lon=${lon}&radius=${radius}`
  // api call
  fetch(placesRequestURL)
  .then(response => response.json())
  .then(function(result){
    for(var i = 0; i < result.results.length; i++){
      var marker = new L.Marker([result.results[i].position.lat, result.results[i].position.lon]);
      marker.addTo(map);
      bankData.set(marker, {
        'name': result.results[i].poi.name,
        'address': result.results[i].address.freeformAddress,
        'phone': result.results[i].poi.phone,
        'url': result.results[i].poi.url,
        'lat': result.results[i].position.lat,
        'lon': result.results[i].position.lon
      });
      marker.addEventListener("click", showModal);
    }
  })
  .catch(error => console.log('error', error));
}


/* GENERATE MODALS FOR MARKERS */
// modal html elements
var modalTitle = document.getElementById('modal-title');
var modalBody = document.getElementById('modal-body');
var modal = document.getElementById('modal');
var directionsButton = document.getElementById("modal-maps");
var addressElement = document.getElementById("modal-address");
var phoneElement = document.getElementById("modal-phone");
var urlElement = document.getElementById("modal-website");
var directionsBtn = document.getElementById("directionsBtn")

var showModal = function(event){
  var clickedMarkerData = bankData.get(event.target);
  // diplay bank name
  modalTitle.textContent = clickedMarkerData.name
  // display address
  if(clickedMarkerData.address != undefined && clickedMarkerData.address != null){
    addressElement.textContent = "Address: " + clickedMarkerData.address;
    directionsButton.addEventListener("click", function(){
      window.open(
        `https://maps.google.com/?q=${clickedMarkerData.address}`,
        '_blank'
      );
    });
  }
  // display phone number
  if(clickedMarkerData.phone != undefined && clickedMarkerData.phone != null){
    phoneElement.setAttribute("href", "tel:" + clickedMarkerData.phone);
    phoneElement.setAttribute("target", "_blank");
    phoneElement.textContent = "Phone: " + clickedMarkerData.phone;
  }
  // display bank website
  if(clickedMarkerData.url != undefined && clickedMarkerData.url != null){
    urlElement.setAttribute("href", "https://" + clickedMarkerData.url);
    urlElement.setAttribute("target", "_blank");
    urlElement.textContent = "Website: " + clickedMarkerData.url;
  }
  modal.setAttribute('style', 'display: block;'); // show modal
}
// close modal
var exitModal = document.getElementById('modal-exit');
exitModal.addEventListener("click", function(){
  modal.setAttribute('style', 'display: none;'); // hide modal
});




/* ASK USER FOR LOCATION */ 
var locationModal = document.getElementById("location-modal");
var exitLocationModal = document.getElementById("location-modal-exit");
exitLocationModal.addEventListener("click", function(){
  locationModal.setAttribute("style", "display: none;");
  location.reload();
})

const locationEnabled = (position) => {
  showMap(position.coords.latitude, position.coords.longitude);
};
const locationDisabled = (error) => {
  console.log(error);
  locationModal.setAttribute("style", "display: block;");
};

navigator.geolocation.getCurrentPosition(locationEnabled, locationDisabled, {timeout:10000});